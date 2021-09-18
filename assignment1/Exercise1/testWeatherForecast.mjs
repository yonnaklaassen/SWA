import {WeatherForecast} from "./weatherForecast.mjs";
import {
    CloudCoveragePrediction,
    PrecipitationPrediction,
    TemperaturePrediction,
    WindPrediction
} from "./weatherDatasAndPredictions.mjs";

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// @@@@@@@@@@@@@@@@@@@@@@@@ REAL TEST @@@@@@@@@@@@@@@@@@@@
// date: newDate(2021,8,13, 12, 0, 0)

// types
const temperature = "Temperature"
const precipitation = "Precipitation"
const wind = "Wind"
const cloudCoverage = "CloudCoverage"

// units
const celsius = "C"
const fahrenheit = "F"
const inch = "inch"
const millimeters = "mm"
const metersPerSecond = "ms"
const milesPerHour = "mph"
const percent = "%"

//precipitation types
const precipitationRain = "Rain"
const precipitationSnow = "Snow"

// wind directions: "N", "S", "W", "E", NW, NE, SW, SE,

// @@@@@ initial test
let historyData = []
let date = new Date(2020, 8, 27, 12, 0, 0)
let place = "Aarhus"
// populating
for (let i = 0; i < 5; i++) {
    historyData.push(
        TemperaturePrediction(date, place, temperature, celsius, randomNum(7, 13), randomNum(14, 25)),
        PrecipitationPrediction(date, place, precipitation, millimeters, randomNum(0.0, 0.2), randomNum(0.2, 3), precipitationRain),
        WindPrediction(date, place, wind, metersPerSecond, randomNum(0.1, 0.10), randomNum(0.11, 10), "N, NE"),
        CloudCoveragePrediction(date, place, cloudCoverage, percent, randomNum(0, 40), randomNum(50, 100))
    )
    let nextDay = new Date()
    nextDay.setDate(date.getDate() + 1)
    date = nextDay
}
let weatherForecast = WeatherForecast(historyData)
//  add function test
place = "Horsens"
weatherForecast.add([TemperaturePrediction(date, place, temperature, celsius, randomNum(7, 13), randomNum(14, 25)),
    PrecipitationPrediction(date, place, precipitation, millimeters, randomNum(0.0, 0.2), randomNum(0.2, 3), precipitationRain),
    WindPrediction(date, place, wind, metersPerSecond, randomNum(0.1, 0.10), randomNum(0.11, 10), "N, NE"),
    CloudCoveragePrediction(date, place, cloudCoverage, percent, randomNum(0, 40), randomNum(50, 100))])

// @@@@ lets filter
let types = [temperature, precipitation, wind, cloudCoverage]
let dataFilteredByType = []

types.forEach((type) => {
    weatherForecast.setTypeFilter(type)
    dataFilteredByType.push(weatherForecast.getFilteredPredictions())
    weatherForecast.clearTypeFilter()
})
// weatherPrediction and print some stuff
for (let i = 0; i < (historyData.length) / 4; i++) {
    let temp = dataFilteredByType[0][i]
    let precip = dataFilteredByType[1][i];
    let wind = dataFilteredByType[2][i];
    let cloud = dataFilteredByType[3][i];
    console.log(">> " + temp.getPlace().toUpperCase())
    console.log("Date: " + temp.getTime())
    console.log("Temperature: min - " + temp.getMin() + temp.getUnit() + ", max - " + temp.getMax() + temp.getUnit())
    console.log("Precipitation: " + precip.getExpectedTypes()
        + ",min - " + precip.getMin() + precip.getUnit()
        + ", max - " + precip.getMax())
    console.log("Wind: min - " + wind.getMin() + wind.getUnit() + ", max - " + wind.getMax() + wind.getUnit()
        + ", expected directions: " + wind.getExpectedDirections())
    console.log("CloudCoverage: min - " + cloud.getMin() + cloud.getUnit() + ", max - " + cloud.getMax() + cloud.getUnit())
    console.log("\n")
}



