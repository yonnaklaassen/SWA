import { Wind } from "./WeatherDataAndPredictions.mjs"
import { Temperature } from "./WeatherDataAndPredictions.mjs"
import { CloudCoverage } from "./WeatherDataAndPredictions.mjs"
import { Precipitation } from "./WeatherDataAndPredictions.mjs"
import { TemperaraturePrediction } from "./WeatherDataAndPredictions.mjs"
import { WindPrediction } from "./WeatherDataAndPredictions.mjs"
import { CloudCoveragePrediction } from "./WeatherDataAndPredictions.mjs"
import { PrecipitationPrediction } from "./WeatherDataAndPredictions.mjs"
import {
    celsius,
    cloudCoverage,
    fahrenheit,
    inch,
    metersPerSecond,
    millimeters,
    okta,
    precipitation,
    temperature,
    wind,
    precipitationSnow,
    precipitationRain
} from "../unitsAndTypes.mjs";
import { milesPerHour } from "../unitsAndTypes.mjs"

const date = new Date(2021, 8, 15)
const place = 'Horsens'

//Test temperature
console.log("\u001b[1;34m TEMPERATURE TEST")
const temp = new Temperature(date, place, temperature, celsius, 12)
temp.convertToF()
console.log("\u001b[1;32m Temperature converted to F: " + temp.getValue())
temp.convertToC()
console.log("\u001b[1;32m Temperature converted back to C: " + temp.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test precipitation
console.log("\u001b[1;34m PRECIPITATION TEST")
const prec = new Precipitation(date, place, precipitation, inch, 20, precipitationSnow)
prec.convertToMM()
console.log("\u001b[1;32m Precipitation converted to MM: " + prec.getValue())
prec.convertToInches()
console.log("\u001b[1;32m Precipitation converted back to Inches: " + prec.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test Wind
console.log("\u001b[1;34m WIND TEST")
const windW = new Wind(date, place, wind, milesPerHour, 100, 'West')
windW.convertToMS()
console.log("\u001b[1;32m Precipitation converted to MS: " + windW.getValue())
windW.convertToMPH()
console.log("\u001b[1;32m Precipitation converted back to MPH: " + windW.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test cloud coverage
console.log("\u001b[1;34m CLOUD COVERAGE TEST TEST")
const cloudCover = new CloudCoverage(date, place, cloudCoverage, okta, 4)
console.log("\u001b[1;32m Cloud coverage value: " + cloudCover.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Temperature prediction test
console.log("\u001b[1;34m TEMPERATURE PREDICTION TEST")
const tempPredict = new TemperaraturePrediction(date, place, temperature, fahrenheit, 10, 20)
tempPredict.convertToC()
console.log("\u001b[1;32m Temperature prediction convert to C:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())
tempPredict.convertToF()
console.log("\u001b[1;32m Temperature prediction convert back to F:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m PRECIPTIATION PREDICTION TEST")
const precPredict = new PrecipitationPrediction(date, place, precipitation, millimeters, 10, 15, precipitationRain)
precPredict.convertToInches()
console.log("\u001b[1;32m Precipitation prediction convert to Inches:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())
precPredict.convertToMM()
console.log("\u001b[1;32m Precipitation prediction convert back to MM:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WIND PREDICTION TEST")
const windPredict = new WindPrediction(date, place, wind, metersPerSecond, 100, 130, 'West')
windPredict.convertToMPH()
console.log("\u001b[1;32m Wind prediction convert to MPH:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())
windPredict.convertToMS()
console.log("\u001b[1;32m Wind prediction convert back to MS:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m CLOUD COVERAGE PREDICTION TEST")
const cloudPredict = new CloudCoveragePrediction(date, place, cloudCoverage, okta, 2, 4)
console.log("\u001b[1;32m Cloud coverage prediction values:\nminValue: " + cloudPredict.getMin() + "\nmaxValue: " + cloudPredict.getMax())

