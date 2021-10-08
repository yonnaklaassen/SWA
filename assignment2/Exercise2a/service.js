import client from "./client.js"
function service() {
    const cl = client()
    // @@@@@@@@@@@@@@@@@@@@@@@@ getLastMeasurements as example of nested requests instead of sending one after another
    // if written like that not the right place,  sending request should belong to the client
    const getLastMeasurements = (types, cities) => {

        function latest(data) {
            return types.map(type => data.filter(data => data.type == type).sort((a, b) => b.time > a.time ? 1 : -1).slice(0, 1))
        }

        const request = new XMLHttpRequest()
        request.open('GET', `http://localhost:8080/data/${cities[0]}`)
        request.send()
        request.onerror = () => {
            window.alert(request.status)
        }
        request.onload = () => {
            if (request.status != 200) {
                window.alert(request.status)
            }

            let data = JSON.parse(request.responseText)
            let city1 = latest(data)

            request.open('GET', `http://localhost:8080/data/${cities[1]}`)
            request.send()
            request.onerror = () => {
                window.alert(request.status)
            }
            request.onload = () => {
                if (request.status != 200) {
                    window.alert(request.status)
                }

                let data = JSON.parse(request.responseText)
                let city2 = latest(data)

                request.open('GET', `http://localhost:8080/data/${cities[2]}`)
                request.send()
                request.onerror = () => {
                    window.alert(request.status)
                }
                request.onload = () => {
                    if (request.status != 200) {
                        window.alert(request.status)
                    }

                    let data = JSON.parse(request.responseText)
                    let city3 = latest(data)

                    document.getElementById("latest_measurements").innerHTML = JSON.stringify([city1, city2, city3])
                }
            }
        }
    }

    const getMinTempLast5Days = (city) => {
        getMinOrMaxTempLast5Days(city, "min")
    }

    const getMaxTempLast5Days = (city) => {
        getMinOrMaxTempLast5Days(city, "max")
    }

    const getMinOrMaxTempLast5Days = (city, minOrMax) => {
        const path = `/data/${city}`
        cl.sendRequestGetResponse(path, (response) => {
            let minOrMaxTemp = response.filter(data => data.type === "temperature")
                .sort((a, b) => b.time > a.time ? 1 : -1).slice(0, 5)
                .reduce((acc, data) => minOrMax == "min" ? Math.min(acc, data.value) : Math.max(acc, data.value), [])

            document.getElementById(`5days_${minOrMax}_temp`).textContent += `${city}: ${minOrMaxTemp}, `
        })
    }

    const getTotalPercipLast5Days = (city) => {
        let path = `/data/${city}`
        cl.sendRequestGetResponse(path, (response) => {
            let total = response.filter(data => data.type === "precipitation")
                .sort((a, b) => b.time > a.time ? 1 : -1).slice(0, 5)
                .reduce((total, data) => total + data.value, 0)

            document.getElementById(`5days_total_precipitation`).textContent += `${city}: ${total}, `
        })
    }

    const getAverageWindSpeedLast5Days = (city) => {
        let path = `/data/${city}`
        cl.sendRequestGetResponse(path, response => {
            let avg = response.filter(data => data.type === "wind speed")
                .sort((a, b) => b.time > a.time ? 1 : -1).slice(0, 5)
                .reduce((total, data) => total + data.value, 0) / 5
            document.getElementById("5days_average_wind_speed").textContent += `${city}: ${avg}, `
        })
    }

    const getForecast = city => {
        let path = `/forecast/${city}`
        cl.sendRequestGetResponse(path, response => {
            let responseAsString = JSON.stringify(response)
            document.getElementById("forecast").textContent += `${city}: ${responseAsString}, `
        })
    }

    return {
        getLastMeasurements,
        getMinTempLast5Days,
        getMaxTempLast5Days,
        getTotalPercipLast5Days,
        getAverageWindSpeedLast5Days,
        getForecast
    }
}

export default service

