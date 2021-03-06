import Client from "./client.js"

export class Service {

    constructor() {
        this.cl = new Client()
    }

    getLastMeasurements(city) {
        const types = ["temperature", "precipitation", "wind speed", "cloud coverage"]
        const path = `data/${city}`
        let tempVal = []

        this.cl.sendGetRequest(path, (response) => {
            let temp = types.map(type => response.filter(data => data.type === type)
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .slice(0, 1))


            temp.forEach((item) => {
                tempVal.push(JSON.stringify(item[0]))
            })

        })
        return tempVal
    }

    getMinTemp(city, dateFrom, dateTo) {
        return this.getMinOrMaxTemp(city, "min", dateFrom, dateTo)
    }

    getMaxTemp(city, dateFrom, dateTo) {
        return this.getMinOrMaxTemp(city, "max", dateFrom, dateTo)
    }

    async getMinOrMaxTemp(city, minOrMax, dateFrom, dateTo) {
        const path = `data/${city}`
        let minOrMaxTemp
        await this.cl.sendGetRequest(path, (response) => {
            let sortedByDate = response.filter(type => type.type === "temperature")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            minOrMaxTemp = sortedByDate.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
                .reduce((acc, data) => minOrMax === "min" ? Math.min(acc, data.value) : Math.max(acc, data.value), [])
            console.log(minOrMaxTemp)
        })
        return minOrMaxTemp
    }

    async getTotalPercip(city, dateFrom, dateTo) {
        let path = `data/${city}`
        let total = undefined
        await this.cl.sendGetRequest(path, (response) => {
            let sortedByDate = response.filter(type => type.type === "precipitation")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            total = sortedByDate.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
                .reduce((total, data) => total + data.value, 0)

        })
        return total
    }

    async getAverageWindSpeed(city, dateFrom, dateTo) {
        let path = `data/${city}`
        let avg
        await this.cl.sendGetRequest(path, response => {
            let sortedByDate = response.filter(type => type.type === "wind speed")
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)

            let days = sortedByDate.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
            let size = days.length
            avg = days.reduce((total, data) => total + data.value, 0) / size
        })
        return avg
    }

    async getForecast(city, dateFrom, dateTo) {
        let path = `forecast/${city}`
        let responseAsString
        await this.cl.sendGetRequest(path, response => {
            console.log(response)
            let _dateFrom = new Date(dateFrom)
            let _dateTo = new Date(dateTo)
            let days = response.filter(a => new Date(a.time) >= _dateFrom & new Date(a.time) <= _dateTo)
            console.log(days)
            responseAsString = days
        })
        return responseAsString
    }

    sendHistoricalData(body){
        let path ='data'
        this.cl.sendPostRequest(path,body)
    }
}