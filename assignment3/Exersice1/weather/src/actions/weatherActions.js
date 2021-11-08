import { 
    FETCH_FORECAST_WEATHER_DATA, 
    FETCH_HISTORIC_WEATHER_DATA , 
    POST_HISTORIC_DATA,  } from "./actionTypes";

export const fetchWeatherData = () => dispatch => {
    try {
        fetch('http://localhost:8080/data')
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_HISTORIC_WEATHER_DATA,
            payload: data
        }))

        fetch('http://localhost:8080/forecast')
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_FORECAST_WEATHER_DATA,
            payload: data
        }))
    }
    catch (err) {
        console.log(err)
    }
}

export const getDataByPlace = (place) => dispatch => {
    try {
        fetch('http://localhost:8080/data/' + place)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_HISTORIC_WEATHER_DATA,
            payload: data
        }))
    
        fetch('http://localhost:8080/forecast/' + place)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_FORECAST_WEATHER_DATA,
            payload: data
        }))
    }    catch (err) {
        console.log(err)
    }
}

export const postHistoricData = data => dispatch => {
    try {
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch('http://localhost:8080/data', {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: POST_HISTORIC_DATA,
            payload: data
        }))
    } catch (err) {
        console.log(err)
    }
}

export const getDataByTime = (from, to) => dispatch => {
    try {
        fetch('http://localhost:8080/data')
        .then(res => res.json())
        .then(data => {
            const filteredHistoricWeatherData = data.filter(d => new Date(d.time) >= new Date(from) 
            && new Date(d.time) <= new Date(to))
                dispatch({
                type: FETCH_HISTORIC_WEATHER_DATA,
                payload: filteredHistoricWeatherData
            })      
        })
        fetch('http://localhost:8080/forecast')
        .then(res => res.json())
        .then(data => {
            const filteredForecastWeatherData = data.filter(d => new Date(d.time) >= new Date(from) 
            && new Date(d.time) <= new Date(to))
            dispatch({
                type: FETCH_FORECAST_WEATHER_DATA,
                payload: filteredForecastWeatherData
            })    
        })
    }catch (err) {
        console.log(err)
    }

}
