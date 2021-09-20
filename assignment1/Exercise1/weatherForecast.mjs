import {Weather} from "./weather.mjs";

export function WeatherForecast(data) {
    const weather = Weather(data)

    return {...weather}
}