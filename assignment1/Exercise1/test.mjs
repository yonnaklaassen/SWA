import { WeatherForecast } from "./weatherForecast.mjs";
import { WeatherHistory } from "./weatherHistory.mjs";
import { Temperature } from "./weatherDatasAndPredictions.mjs";
import { Precipitation } from "./weatherDatasAndPredictions.mjs";
import { Wind } from "./weatherDatasAndPredictions.mjs";
import { CloudCoverage } from "./weatherDatasAndPredictions.mjs";
import { TemperaturePrediction } from "./weatherDatasAndPredictions.mjs";
import { PrecipitationPrediction } from "./weatherDatasAndPredictions.mjs";
import { WindPrediction } from "./weatherDatasAndPredictions.mjs";
import {Event} from "./weatherDatasAndPredictions.mjs";
import {WeatherData} from "./weatherDatasAndPredictions.mjs";

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// sandbox
let x = Event({time: 10.00, place: "here"})
console.log(x.getPlace())


let y = WeatherData({time: 12.00, place: "there", unit: "C", type: "other", value: 12})

let c  = Temperature(12.00, "there", "temperature", "F", 56.0)
let list = []

list.push(y)
list.push(c)


list.forEach((d) => {
    if (d.getType() == "temperature") {
        console.log("this is temperature data:" + d.getValue())
    }
})

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
const percent = "%" // from 0/8 to 8/8

//precipitation types
const precipitationRain = "Rain"
const precipitationSnow = "Snow"

// wind directions: N,S,W,E

// @@@@@ initial test
let historyData = []
let date = new Date(2020,8,27,12,0,0)
let place = "Aarhus"

for (let i = 0; i < 9; i++) {
    historyData.push(
        Temperature(date,place,temperature,celsius, randomNum(-11,25)),
        Precipitation(date,place,precipitation, millimeters, randomNum(0,10), precipitationRain),
        Wind(date,place,wind,metersPerSecond,randomNum(0.1, 10),"N"),
        CloudCoverage(date,place,cloudCoverage,percent,randomNum(0,100))
    )
    let nextDay = new Date()
    nextDay.setDate(date.getDate()+1)
    date = nextDay
}
let weatherHistory = WeatherHistory(historyData)

// @@@@ lets filter weatherHistory and print some stuff
let types = [temperature, precipitation, wind, cloudCoverage]
let dataFilteredByType = []

types.forEach((type) => {
    weatherHistory.setTypeFilter(type)
    dataFilteredByType.push(weatherHistory.getFilteredData())
    weatherHistory.clearTypeFilter()
})

for (let i = 0; i < (historyData.length)/4 ; i++) {
    console.log(">> "+dataFilteredByType[0][i].getPlace().toUpperCase())
    console.log("Date: "+dataFilteredByType[0][i].getTime())
    console.log("Temperature: "+dataFilteredByType[0][i].getValue()+dataFilteredByType[0][i].getUnit())
    console.log("Precipitation: "+dataFilteredByType[1][i].getPrecipitationType()+", "+dataFilteredByType[1][i].getValue()+dataFilteredByType[1][i].getUnit())
    console.log("Wind: "+dataFilteredByType[2][i].getValue()+dataFilteredByType[2][i].getUnit()+", direction: "+dataFilteredByType[2][i].getDirection())
    console.log("CloudCoverage: "+dataFilteredByType[3][i].getValue()+dataFilteredByType[3][i].getUnit())
    console.log("\n")
}



