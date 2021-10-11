import {Weather} from "./weather.mjs";

export function WeatherForecast(data) {
    const weather = Weather(data)

    const averageFromValue = () => {
        return data.reduce((a, b) => a.min+b.min, 0)/data.length
    }

    const averageToValue = () => {
        return data.reduce((a, b) => a.max+b.max,0)/data.length
    }

    return {...weather, averageFromValue, averageToValue}
}