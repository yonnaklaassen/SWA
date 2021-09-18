import { WeatherForecast } from "./WeatherHistoryAndForecast.mjs"
import { WeatherHistory } from "./WeatherHistoryAndForecast.mjs"
import { Wind } from "./WeatherDataAndPredictions.mjs"
import { Temperature } from "./WeatherDataAndPredictions.mjs"
import { CloudCoverage } from "./WeatherDataAndPredictions.mjs"
import { Precipitation } from "./WeatherDataAndPredictions.mjs"
import { TemperaraturePrediction } from "./WeatherDataAndPredictions.mjs"
import { WindPrediction } from "./WeatherDataAndPredictions.mjs"
import { CloudCoveragePrediction } from "./WeatherDataAndPredictions.mjs"
import { PrecipitationPrediction } from "./WeatherDataAndPredictions.mjs"
import { DateInterval } from "./WeatherDataAndPredictions.mjs"

const weatherTypes = ['History', 'Forecast']

const date1 = new Date(2021, 8, 15)
const date2 = new Date(2021, 5, 12)
const place = ['Horsens', 'Århus']

const units = ['C', 'F', 'Inch', 'MM', 'MPH', 'MS', 'Oktas']
const types = ['Temperature', 'Precipitation', 'Wind', 'Cloud']

const temp = new Temperature(date1, place[0], types[0], units[0], 12)
const prec = new Precipitation(date2, place[1], types[1], units[3], 20, 'snow')
const wind = new Wind(date1, place[0], types[2], units[4], 100, 'West')
const cloudCoverage = new CloudCoverage(date2, place[0], types[3], units[6], 4)

const tempPredict = new TemperaraturePrediction(date1, place[1], types[0], units[1], 10, 20)
const precPredict = new PrecipitationPrediction(date2, place[0], types[1], units[3], 10, 15, 'rain')
const windPredict = new WindPrediction(date1, place[1], types[2], units[5], 100, 130, 'West')
const cloudPredict = new CloudCoveragePrediction(date2, place[0], types[3], units[6], 2, 4)

console.log("\u001b[1;34m WEATHER HISTORY TEST")
const weatherDataArray = new Array()
weatherDataArray.push(temp)
weatherDataArray.push(prec)
weatherDataArray.push(wind)
const weatherHistory = new WeatherHistory(weatherDataArray)

let weatherDataArray2  = new Array()
weatherDataArray2 .push(cloudCoverage)
weatherHistory.add(weatherDataArray2)

//Testing US conversion
weatherHistory.convertToUsUnits(weatherTypes[0])
console.log("\u001b[1;33m ALL US UNITS:\n")
weatherDataArray.forEach(d => {
    console.log("\u001b[1;32m Value: " + d.getValue() + "\nThe unit: " + d.getUnit())
})

//Testing International converion
weatherHistory.convertToInternationalUnits(weatherTypes[0])
console.log("\u001b[1;33m ALL INTERNATIONAL UNITS:\n")
weatherDataArray.forEach(d => {
    console.log("\u001b[1;32m Value: " + d.getValue() + "\nThe unit: " + d.getUnit())
})

//Testing filters
console.log("\u001b[1;33m FILTER BY HORSENS:\n")
weatherHistory.setPlaceFilter(place[0])
const placeHorsens = weatherHistory.getFilteredData()
placeHorsens.forEach(d => {
    console.log("\u001b[1;32m Place: " + d.getPlace())
})

console.log("\u001b[1;33m FILTER BY HORSENS AND PERIOD:\n")
const dateInterval = new DateInterval(new Date(2021, 8, 1), new Date(2021, 8, 31))
weatherHistory.setPeriodFilter(dateInterval)
const placeHorsensAndPeriod = weatherHistory.getFilteredData()
placeHorsensAndPeriod .forEach(d => {
    console.log("\u001b[1;32m Place: " + d.getPlace() + "\nTime: " + d.getTime())
})
console.log("\u001b[1;33m FILTER BY HORSENS, PERIOD AND TYPE:\n")
weatherHistory.setTypeFilter(types[0])
const placeHorsensAndPeriodAndTemperature  = weatherHistory.getFilteredData()
placeHorsensAndPeriodAndTemperature.forEach(d => {
    console.log("\u001b[1;32m Place: " + d.getPlace() + "\nTime: " + d.getTime() + '\nType: ' + d.getType())
})

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WEATHERFORECAST TEST")
let weatherForecastArray = new Array()
weatherForecastArray.push(tempPredict)
weatherForecastArray.push(precPredict)
weatherForecastArray.push(windPredict)

const weatherForecast = new WeatherForecast(weatherForecastArray)
let weatherForecastArray2 = new Array()
weatherForecastArray2.push(cloudPredict)

//Testing add function
weatherForecast.add(weatherForecastArray2)
weatherForecast.convertToUsUnits(weatherTypes[1])

//Testing US conversion
console.log("\u001b[1;33m ALL US UNITS:\n")
weatherForecastArray.forEach(d => {
    console.log("\u001b[1;32m MinValue: " + d.getMin() + "\nMaxValue: " + d.getMax() + "\nThe unit: " + d.getUnit())
})

//Testing International converion
weatherForecast.convertToInternationalUnits(weatherTypes[1])
console.log("\u001b[1;33m ALL INTERNATIONAL UNITS:\n")
weatherForecastArray.forEach(d => {
    console.log("\u001b[1;32m MinValue: " + d.getMin() + "\nMaxValue: " + d.getMax() + "\nThe unit: " + d.getUnit())
})



