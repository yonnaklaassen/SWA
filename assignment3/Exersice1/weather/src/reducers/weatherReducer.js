/* eslint-disable import/no-anonymous-default-export */
import { FETCH_FORECAST_WEATHER_DATA, 
    FETCH_HISTORIC_WEATHER_DATA , 
     POST_HISTORIC_DATA } from "../actions/actionTypes";

const initialState = {
    historicWeatherData: [],
    forecastWeatherData: [],
    newHistoricData: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_HISTORIC_WEATHER_DATA:
            return {
                ...state,
                historicWeatherData: action.payload
            }
        case FETCH_FORECAST_WEATHER_DATA:
            return {
                ...state,
                forecastWeatherData: action.payload
            } 
                case POST_HISTORIC_DATA:
                    return {
                        ...state,
                        newHistoricData: action.payload
                    }
        default:
            return state

    }
}