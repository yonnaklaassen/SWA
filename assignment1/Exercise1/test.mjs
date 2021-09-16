import { WeatherForecast } from "./weatherForecast.mjs";
import { WeatherHistory } from "./weatherHistory.mjs";
import { Temperature } from "./weatherDatasAndPredictions.mjs";
import { Precipitation } from "./weatherDatasAndPredictions.mjs";
import { Wind } from "./weatherDatasAndPredictions.mjs";
import { TemperaturePrediction } from "./weatherDatasAndPredictions.mjs";
import { PrecipitationPrediction } from "./weatherDatasAndPredictions.mjs";
import { WindPrediction } from "./weatherDatasAndPredictions.mjs";
import {Event} from "./weatherDatasAndPredictions.mjs";
import {WeatherData} from "./weatherDatasAndPredictions.mjs";

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