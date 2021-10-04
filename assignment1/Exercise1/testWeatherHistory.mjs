import {WeatherHistory} from "./weatherHistory.mjs";
import {CloudCoverage, Precipitation, Temperature, Wind} from "./weatherDatasAndPredictions.mjs";
import {
    celsius,
    cloudCoverage,
    metersPerSecond,
    millimeters,
    percent,
    precipitation,
    precipitationRain,
    temperature,
    wind
} from "../unitsAndTypes.mjs";

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// wind directions: "N", "S", "W", "E", NW, NE, SW, SE,

// @@@@@ initial test
let historyData = []
let date = new Date(2020, 8, 27, 12, 0, 0)
let place = "Aarhus"

for (let i = 0; i < 5; i++) {
    historyData.push(
        Temperature(date, place, temperature, celsius, randomNum(-11, 25)),
        Precipitation(date, place, precipitation, millimeters, randomNum(0, 10), precipitationRain),
        Wind(date, place, wind, metersPerSecond, randomNum(0.1, 10), "N"),
        CloudCoverage(date, place, cloudCoverage, percent, randomNum(0, 100))
    )
    let nextDay = new Date()
    nextDay.setDate(date.getDate() + 1)
    date = nextDay
}
let weatherHistory = WeatherHistory(historyData)
place = "Horsens"
weatherHistory.add([
    Temperature(date, place, temperature, celsius, randomNum(-11, 25)),
    Precipitation(date, place, precipitation, millimeters, randomNum(0, 10), precipitationRain),
    Wind(date, place, wind, metersPerSecond, randomNum(0.1, 10), "N"),
    CloudCoverage(date, place, cloudCoverage, percent, randomNum(0, 100))
])

// @@@@ lets filter weatherHistory and print some stuff
let types = [temperature, precipitation, wind, cloudCoverage]
let dataFilteredByType = []

types.forEach((type) => {
    weatherHistory.setTypeFilter(type)
    dataFilteredByType.push(weatherHistory.getFilteredData())
    weatherHistory.clearTypeFilter()
})

for (let i = 0; i < (historyData.length) / 4; i++) {
    console.log(">> " + dataFilteredByType[0][i].getPlace().toUpperCase())
    console.log("Date: " + dataFilteredByType[0][i].getTime())
    console.log("Temperature: " + dataFilteredByType[0][i].getValue() + dataFilteredByType[0][i].getUnit())
    console.log("Precipitation: " + dataFilteredByType[1][i].getPrecipitationType() + ", " + dataFilteredByType[1][i].getValue() + dataFilteredByType[1][i].getUnit())
    console.log("Wind: " + dataFilteredByType[2][i].getValue() + dataFilteredByType[2][i].getUnit() + ", direction: " + dataFilteredByType[2][i].getDirection())
    console.log("CloudCoverage: " + dataFilteredByType[3][i].getValue() + dataFilteredByType[3][i].getUnit())
    console.log("\n")
}



