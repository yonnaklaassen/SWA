import { Wind } from "./WeatherDataAndPredictions.mjs"
import { Temperature } from "./WeatherDataAndPredictions.mjs"
import { CloudCoverage } from "./WeatherDataAndPredictions.mjs"
import { Precipitation } from "./WeatherDataAndPredictions.mjs"
import { TemperaraturePrediction } from "./WeatherDataAndPredictions.mjs"
import { WindPrediction } from "./WeatherDataAndPredictions.mjs"
import { CloudCoveragePrediction } from "./WeatherDataAndPredictions.mjs"
import { PrecipitationPrediction } from "./WeatherDataAndPredictions.mjs"

const date = new Date(2021, 8, 15)
const place = 'Horsens'

const units = ['C', 'F', 'Inch', 'MM', 'MPH', 'MS', 'Oktas']
const types = ['Temperature', 'Precipitation', 'Wind', 'Cloud']

//Test temperature
console.log("\u001b[1;34m TEMPERATURE TEST")
const temp = new Temperature(date, place, types[0], units[0], 12)
temp.convertToF()
console.log("\u001b[1;32m Temperature converted to F: " + temp.getValue())
temp.convertToC()
console.log("\u001b[1;32m Temperature converted back to C: " + temp.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test precipitation
console.log("\u001b[1;34m PRECIPITATION TEST")
const prec = new Precipitation(date, place, types[1], units[3], 20, 'snow')
prec.convertToMM()
console.log("\u001b[1;32m Precipitation converted to MM: " + prec.getValue())
prec.convertToInches()
console.log("\u001b[1;32m Precipitation converted back to Inches: " + prec.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test Wind
console.log("\u001b[1;34m WIND TEST")
const wind = new Wind(date, place, types[2], units[4], 100, 'West')
wind.convertToMS()
console.log("\u001b[1;32m Precipitation converted to MS: " + wind.getValue())
wind.convertToMPH()
console.log("\u001b[1;32m Precipitation converted back to MPH: " + wind.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test cloud coverage
console.log("\u001b[1;34m CLOUD COVERAGE TEST TEST")
const cloudCoverage = new CloudCoverage(date, place, types[3], units[6], 4)
console.log("\u001b[1;32m Cloud coverage value: " + cloudCoverage.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Temperature prediction test
console.log("\u001b[1;34m TEMPERATURE PREDICTION TEST")
const tempPredict = new TemperaraturePrediction(date, place, types[0], units[1], 10, 20)
tempPredict.convertToC()
console.log("\u001b[1;32m Temperature prediction convert to C:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())
tempPredict.convertToF()
console.log("\u001b[1;32m Temperature prediction convert back to F:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m PRECIPTIATION PREDICTION TEST")
const precPredict = new PrecipitationPrediction(date, place, types[1], units[3], 10, 15, 'rain')
precPredict.convertToInches()
console.log("\u001b[1;32m Precipitation prediction convert to Inches:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())
precPredict.convertToMM()
console.log("\u001b[1;32m Precipitation prediction convert back to MM:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WIND PREDICTION TEST")
const windPredict = new WindPrediction(date, place, types[2], units[5], 100, 130, 'West')
windPredict.convertToMPH()
console.log("\u001b[1;32m Wind prediction convert to MPH:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())
windPredict.convertToMS()
console.log("\u001b[1;32m Wind prediction convert back to MS:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m CLOUD COVERAGE PREDICTION TEST")
const cloudPredict = new CloudCoveragePrediction(date, place, types[3], units[6], 2, 4)
console.log("\u001b[1;32m Cloud coverage prediction values:\nminValue: " + cloudPredict.getMin() + "\nmaxValue: " + cloudPredict.getMax())

