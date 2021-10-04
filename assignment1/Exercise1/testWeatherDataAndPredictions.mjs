import {
    CloudCoverage,
    CloudCoveragePrediction,
    Precipitation,
    PrecipitationPrediction,
    Temperature,
    TemperaturePrediction,
    Wind,
    WindPrediction
} from "./weatherDatasAndPredictions.mjs";
import {
    celsius,
    cloudCoverage,
    fahrenheit,
    inch,
    metersPerSecond,
    millimeters,
    okta,
    percent,
    precipitation,
    temperature,
    wind
} from "../unitsAndTypes.mjs";


const date = new Date(2021, 8, 15)
const place = 'Horsens'

//Test temperature
console.log("\u001b[1;34m TEMPERATURE TEST")
const temp = Temperature(date, place, temperature, celsius, 12)
temp.convertToF()
console.log("\u001b[1;32m Temperature converted to F: " + temp.getValue())
temp.convertToC()
console.log("\u001b[1;32m Temperature converted back to C: " + temp.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test precipitation
console.log("\u001b[1;34m PRECIPITATION TEST")
const prec = Precipitation(date, place, precipitation, inch, 20, 'snow')
prec.convertToMM()
console.log("\u001b[1;32m Precipitation converted to MM: " + prec.getValue())
prec.convertToInches()
console.log("\u001b[1;32m Precipitation converted back to Inches: " + prec.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test Wind
console.log("\u001b[1;34m WIND TEST")
const wind1 = Wind(date, place, wind, metersPerSecond, 100, 'West')
wind1.convertToMS()
console.log("\u001b[1;32m Precipitation converted to MS: " + wind1.getValue())
wind1.convertToMPH()
console.log("\u001b[1;32m Precipitation converted back to MPH: " + wind1.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Test cloud coverage
console.log("\u001b[1;34m CLOUD COVERAGE TEST TEST")
const cloudCoverage1 = CloudCoverage(date, place, cloudCoverage, percent, 4)
console.log("\u001b[1;32m Cloud coverage value: " + cloudCoverage1.getValue())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

//Temperature prediction test
console.log("\u001b[1;34m TEMPERATURE PREDICTION TEST")
const tempPredict = TemperaturePrediction(date, place, temperature, fahrenheit, 10, 20)
tempPredict.convertToC()
console.log("\u001b[1;32m Temperature prediction convert to C:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())
tempPredict.convertToF()
console.log("\u001b[1;32m Temperature prediction convert back to F:\nminValue: " + tempPredict.getMin() + "\nmaxValue: " + tempPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m PRECIPTIATION PREDICTION TEST")
const precPredict = PrecipitationPrediction(date, place, precipitation, millimeters, 10, 15, 'rain')
precPredict.convertToInches()
console.log("\u001b[1;32m Precipitation prediction convert to Inches:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())
precPredict.convertToMM()
console.log("\u001b[1;32m Precipitation prediction convert back to MM:\nminValue: " + precPredict.getMin() + "\nmaxValue: " + precPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m WIND PREDICTION TEST")
const windPredict = WindPrediction(date, place, wind, metersPerSecond, 100, 130, 'West')
windPredict.convertToMPH()
console.log("\u001b[1;32m Wind prediction convert to MPH:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())
windPredict.convertToMS()
console.log("\u001b[1;32m Wind prediction convert back to MS:\nminValue: " + windPredict.getMin() + "\nmaxValue: " + windPredict.getMax())

console.log("\u001b[1;33m -------------------------------------------------------------------------------")

console.log("\u001b[1;34m CLOUD COVERAGE PREDICTION TEST")
const cloudPredict = CloudCoveragePrediction(date, place, cloudCoverage, okta, 2, 4)
console.log("\u001b[1;32m Cloud coverage prediction values:\nminValue: " + cloudPredict.getMin() + "\nmaxValue: " + cloudPredict.getMax())

