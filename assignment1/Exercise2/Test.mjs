import { WeatherForecast } from "./WeatherForecast.mjs";
import { WeatherHistory } from "./WeatherHistory.mjs";
import { Temperature } from "./Exercise2/Exercise2.mjs";
import { Precipitation } from "./Exercise2/Exercise2.mjs";
import { Wind } from "./Exercise2/Exercise2.mjs";
import { TemperaraturePrediction } from "./Exercise2/Exercise2.mjs";
import { PrecipitationPrediction } from "./Exercise2/Exercise2.mjs";
import { Windprediction } from "./Exercise2/Exercise2.mjs";

var date = new Date(2021, 8, 15)

//Test temperature
console.log("\u001b[1;34m TEMPERATURE TEST")
const temp = new Temperature(date, 'Horsens', 'Temperature', 'C', 12)
temp.convertToF()
console.log("\u001b[1;32m Temperature converted to F: " + temp.getValue())
temp.convertToC()
console.log("\u001b[1;32m Temperature converted back to C: " + temp.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test precipitation
console.log("\u001b[1;34m PRECIPITATION TEST")
const prec = new Precipitation(date, 'Horsens', 'Precipitation', 'Inch', 20, 'snow')
prec.convertToMM()
console.log("\u001b[1;32m Precipitation converted to MM: " + prec.getValue())
prec.convertToInches()
console.log("\u001b[1;32m Precipitation converted back to Inches: " + prec.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test Wind
console.log("\u001b[1;34m WIND TEST")
const wind = new Wind(date, 'Horsens', 'Wind', 'MPH', 100, 'West')
wind.convertToMS()
console.log("\u001b[1;32m Precipitation converted to MS: " + wind.getValue())
wind.convertToMPH()
console.log("\u001b[1;32m Precipitation converted back to MPH: " + wind.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Temperature prediction test
console.log("\u001b[1;34m TEMPERATURE PREDICTION TEST")
const tempPredict = new TemperaraturePrediction(date, 'Horsens', 'Temperature', 'F', 10, 20)
tempPredict.convertToC()
console.log("\u001b[1;32m Temperature prediction convert to C:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())
tempPredict.convertToF()
console.log("\u001b[1;32m Temperature prediction convert back to F:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m PRECIPTIATION PREDICTION TEST")
const precPredict = new PrecipitationPrediction(date, 'Horsens', 'Precipitation', 'MM', 10, 15, 'rain')
precPredict.convertToInches()
console.log("\u001b[1;32m Precipitation prediction convert to Inches:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())
precPredict.convertToMM()
console.log("\u001b[1;32m Precipitation prediction convert back to MM:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WIND PREDICTION TEST")
const windPredict = new Windprediction(date, 'Horsens', 'Wind', 'MS', 100, 130, 'West')
windPredict.convertToMPH()
console.log("\u001b[1;32m Wind prediction convert to MPH:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())
windPredict.convertToMS()
console.log("\u001b[1;32m Wind prediction convert back to MS:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WEATHER HISTORY TEST")
const weatherDataArray = new Array()
weatherDataArray.push(temp)
weatherDataArray.push(prec)
weatherDataArray.push(wind)
const weatherHistory = new WeatherHistory(weatherDataArray)

//Testing US conversion
weatherHistory.convertToUsUnits()
console.log("\u001b[1;33m ALL US UNITS:\n")
weatherDataArray.forEach(d => {
    console.log("\u001b[1;32m Value: " + d.getValue() + "\nThe unit: " + d.getUnit())
})

//Testing International converion
weatherHistory.convertToInternationalUnits()
console.log("\u001b[1;33m ALL INTERNATIONAL UNITS:\n")
weatherDataArray.forEach(d => {
    console.log("\u001b[1;32m Value: " + d.getValue() + "\nThe unit: " + d.getUnit())
})

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WEATHERFORECAST TEST")
let weatherForecastArray = new Array()
weatherForecastArray.push(tempPredict)
weatherForecastArray.push(precPredict)

const weatherForecast = new WeatherForecast(weatherForecastArray)
let weatherForecastArray2 = new Array()
weatherForecastArray2.push(windPredict)
weatherForecast.add(weatherForecastArray2)
weatherForecast.convertToUsUnits()

//Testing US conversion
console.log("\u001b[1;33m ALL US UNITS:\n")
weatherForecastArray.forEach(d => {
    console.log("\u001b[1;32m MinValue: " + d.getMin() + "\nMaxValue: " + d.getMax() + "\nThe unit: " + d.getUnit())
})

//Testing International converion
weatherForecast.convertToInternationalUnits()
console.log("\u001b[1;33m ALL INTERNATIONAL UNITS:\n")
weatherForecastArray.forEach(d => {
    console.log("\u001b[1;32m MinValue: " + d.getMin() + "\nMaxValue: " + d.getMax() + "\nThe unit: " + d.getUnit())
})



