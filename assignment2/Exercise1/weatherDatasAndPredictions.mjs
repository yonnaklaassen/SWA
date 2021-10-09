
export function Event(state) {
    return {
        getTime() {
            return state.time
        },
        getPlace() {
            return state.place
        }
    }
}

export function DataType(state) {
    return {
        getType() {
            return state.type
        },
        getUnit() {
            return state.unit
        }
    }
}

//left side
export function WeatherData(state) {
    const event = Event(state)
    const dataType = DataType(state)

    function getValue() {
        return state.value
    }

    return {...event, ...dataType, getValue}
}

export function Temperature(time, place, type, unit, value) {
    const state = {time, place, type, unit, value}
    const weatherData = WeatherData(state)

    function convertToF() {
        if (state.unit == 'C') {
            state.value *= 1.25
            state.unit = "F"
        }
    }

    function convertToC() {
        if (state.unit == 'F') {
            state.value *= 0.75
            state.unit = "C"
        }
    }

    return {...weatherData, convertToF, convertToC}
}

export function Precipitation(time, place, type, unit, value, precipitationType) {
    const state = {time, place, type, unit, value}
    const weatherData = WeatherData(state)

    function getPrecipitationType() {
        return state.precipitationType
    }

    function convertToInches() {
        if (state.unit == "mm") {
            state.value *= 0.75
            state.unit = "inch"
        }
    }

    function convertToMM() {
        if (state.unit == "inch") {
            state.value *= 1.25
            state.unit = "mm"
        }
    }

    return {...weatherData, getPrecipitationType, convertToInches, convertToMM}
}

export function Wind(time, place, type, unit, value, direction) {
    const state = {time, place, type, unit, value, direction}
    const weatherData = WeatherData(state)

    function getDirection() {
        return state.direction
    }

    function convertToMPH() {
        if (state.unit == "ms") {
            state.value *= 1.75
            state.unit = "mph"
        }
    }

    function convertToMS() {
        if (this.state == "mph") {
            state.value *= 0.25
            state.unit = "ms"
        }
    }

    return {...weatherData, getDirection, convertToMPH, convertToMS}
}

export function CloudCoverage(time, place, type, unit, value) {
    const state = {time, place, type, unit, value}
    const weatherData = WeatherData(state)
    return {...weatherData}
}

// RIGHT SIDE

export function WeatherPrediction(state) {
    const event = Event(state)
    const dataType = DataType(state)

    function getMax() {
        return state.max
    }

    function getMin() {
        return state.min
    }

    function matches(data) {
        if (data.pop().value < state.max
            && data.pop().value > state.min) {
            return true
        }
        return false
    }

    return {...event, ...dataType, getMax, getMin, matches}
}

export function TemperaturePrediction(time, place, type, unit, max, min) {
    const state = {time, place, type, unit, min, max}
    const weatherPrediction = WeatherPrediction(state)

    function convertToF() {
        if (state.unit == "C") {
            state.max = state.max * 0.75
            state.min = state.min * 0.75
            state.unit == "F"

        }
    }

    function convertToC() {
        if (state.unit == "F") {
            state.max = state.max * 1.25
            state.min = state.min * 1.25
            state.unit = "C"
        }
    }

    return {...weatherPrediction, convertToC, convertToF}
}

export function PrecipitationPrediction(time, place, type, unit, min, max, precipitationType) {
    const state = {time, place, type, unit, min, max}
    const weatherPrediction = WeatherPrediction(state)

    function getExpectedTypes() {
        return precipitationType
    }

    function matches(data) {
        weatherPrediction.matches(data)
    }

    function convertToInches() {
        if (state.unit == "mm") {
            state.min *= 1.25
            state.max *= 1.25
            state.unit = "inch"
        }
    }

    function convertToMM() {
        if (state.unit == "inch") {
            state.min *= 0.75
            state.max *= 0.75
            state.unit = "mm"
        }
    }

    return {...weatherPrediction, getExpectedTypes, matches, convertToInches, convertToMM}
}

// wind directions: "N", "S", "W", "E", NW, NE, SW, SE,
export function WindPrediction(time, place, type, unit, min, max, expectedDirections) {
    const state = {time, place, type, unit, min, max, expectedDirections}
    const weatherPrediction = WeatherPrediction(state)

    function getExpectedDirections() {
        return state.expectedDirections
    }

    function convertToMPH() {
        if (state.unit == "ms") {
            state.min *= 0.75
            state.max *= 0.75
            state.unit = "mph"
        }
    }

    function convertToMS() {
        if (state.unit == "mph") {
            state.min *= 1.25
            state.max *= 1.25
            state.unit = "ms"
        }
    }

    return {...weatherPrediction, getExpectedDirections, convertToMPH, convertToMS}
}

export function CloudCoveragePrediction(time, place, type, unit, min, max) {
    const state = {time, place, type, unit, min, max}
    const weatherPrediction = WeatherPrediction(state)
    return {...weatherPrediction}
}

// @@@@@@@@@@@@@@@@@@@@ Date Interval
// date: newDate(2021,8,13, 12, 0, 0)
export function DateInterval(from, to) {
    return {
        getFrom() {
            return from
        },
        getTo() {
            return to
        },
        contains(date) {
            return from < date && to > date;
        }
    }
}