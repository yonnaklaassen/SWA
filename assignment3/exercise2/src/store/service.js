import Client from "./client.js"

export class Service {

    constructor() {
        this.cl = new Client()
    }

    getLastMeasurements(city) {
        const types = ["temperature", "precipitation", "wind speed", "cloud coverage"]
        const path = `data/${city}`
        let tempVal = []

        this.cl.sendRequestGetResponse(path, (response) => {
            let temp = types.map(type => response.filter(data => data.type === type)
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .slice(0, 1))


            temp.forEach((item) => {
                tempVal.push(JSON.stringify(item[0]))
            })

        })
        return tempVal

    }

    getMinTempLast5Days(city) {
        this.getMinOrMaxTempLast5Days(city, "min")
    }

    getMaxTempLast5Days(city) {
        this.getMinOrMaxTempLast5Days(city, "max")
    }

    getMinOrMaxTempLast5Days(city, minOrMax) {
        const path = `/data/${city}`
        this.cl.sendRequestGetResponse(path, (response) => {
            let sortedByDate = response.filter(type => type.type === "temperature").sort((a, b) => new Date(b.time) - new Date(a.time))
            let d = new Date(sortedByDate[0].time)
            d.setDate(d.getDate() - 5)
            let minOrMaxTemp = sortedByDate.filter(a => new Date(a.time) > d)
                .reduce((acc, data) => minOrMax == "min" ? Math.min(acc, data.value) : Math.max(acc, data.value), [])

            document.getElementById(`5days_${minOrMax}_temp`).textContent += `${city}: ${minOrMaxTemp}, `
        })
    }

    getTotalPercipLast5Days(city) {
        let path = `/data/${city}`
        this.cl.sendRequestGetResponse(path, (response) => {
            let sortedByDate = response.filter(type => type.type === "precipitation").sort((a, b) => new Date(b.time) - new Date(a.time))
            let d = new Date(sortedByDate[0].time)
            d.setDate(d.getDate() - 5)
            console.log(d)
            let total = sortedByDate.filter(a => new Date(a.time) > d)
                .reduce((total, data) => total + data.value, 0)

            document.getElementById(`5days_total_precipitation`).textContent += `${city}: ${total}, `
        })
    }

    getAverageWindSpeedLast5Days(city) {
        let path = `/data/${city}`
        this.cl.sendRequestGetResponse(path, response => {
            let sortedByDate = response.filter(type => type.type === "temperature").sort((a, b) => new Date(b.time) - new Date(a.time))
            let d = new Date(sortedByDate[0].time)
            d.setDate(d.getDate() - 5)
            let last5days = sortedByDate.filter(a => new Date(a.time) > d)
            let size = last5days.length
            let avg = last5days.reduce((total, data) => total + data.value, 0) / size
            document.getElementById("5days_average_wind_speed").textContent += `${city}: ${avg}, `
        })
    }

    getForecast(city) {
        let path = `/forecast/${city}`
        this.cl.sendRequestGetResponse(path, response => {
            let responseAsString = JSON.stringify(response)
            document.getElementById("forecast").textContent += `${city}: ${responseAsString}, `
        })
    }
}