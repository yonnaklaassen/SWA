import {Weather} from "./weather.mjs";

export function WeatherForecast(data) {
    const weather = Weather(data)

    const averageFromValue = () => {

    }

    const averageToValue = () => {

    }

    return {...weather, averageFromValue, averageToValue}
}