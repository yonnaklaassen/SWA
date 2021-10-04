import {Weather} from "./weather.mjs";

export function WeatherHistory(data) {
    const weather = Weather(data)

    return {...weather}
}