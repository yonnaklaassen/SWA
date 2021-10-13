import {Weather} from "./weather.mjs";

export function WeatherHistory(data) {
    const weather = Weather(data)

    function lowestValue(){
        weather.checkIfEmptyOrDifferentTypes()
        return data.reduce((acc, data) => Math.min(acc, data.value), [])
    }

    return {...weather, lowestValue }
}