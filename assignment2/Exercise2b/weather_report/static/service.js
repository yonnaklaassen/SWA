const querySelectorsData = ['#horsens-data', '#aarhus-data', '#copenhagen-data']
const querySelectorsForecast = ['#horsens-forecast', '#aarhus-forecast', '#copenhagen-forecast']

export const getDataByPlace = (data, type, place) => {
       return data.filter(d => d.type === type && d.place === place)
        .sort((a, b) => b.time > a.time ? 1: -1)
        .slice(0, 5)
}

export const showWeatherDataTemperature = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    weatherData.forEach(weatherData  => {
    const weatherDataElement = document.createElement('p');
    weatherDataElement.innerText = `Value: ${weatherData.value},` +
    ` Type: ${weatherData.type},` +
    ` Unit: ${weatherData.unit},` +
    ` Time: ${weatherData.time},` +
    ` Place: ${weatherData.place}`
    weatherDataDiv.append(weatherDataElement)
  }); 
}

export const showWeatherDataWind = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    weatherData.forEach(weatherData  => {
    const weatherDataElement = document.createElement('p');
    weatherDataElement.innerText = `Value: ${weatherData.value},` +
    ` Direction: ${weatherData.direction},` +
    ` Type: ${weatherData.type},` +
    ` Unit: ${weatherData.unit},` +
    ` Time: ${weatherData.time},` +
    ` Place: ${weatherData.place}`
    weatherDataDiv.append(weatherDataElement)
  }); 
}

export const showWeatherDataPrecipitation = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    weatherData.forEach(weatherData  => {
    const weatherDataElement = document.createElement('p');
    weatherDataElement.innerText = `Value: ${weatherData.value},` +
    ` Precipitation type: ${weatherData.precipitation_type},` +
    ` Type: ${weatherData.type},` +
    ` Unit: ${weatherData.unit},` +
    ` Time: ${weatherData.time},` +
    ` Place: ${weatherData.place}`
    weatherDataDiv.append(weatherDataElement)
  }); 
}

export const showMinTemperature = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    const values = weatherData.map(d => d.value)
    const minTemp = Math.min(...values)
      const weatherDataElement = document.createElement('p');
      weatherDataElement.innerText = `Min Temp value: ${minTemp}`
      weatherDataDiv.append(weatherDataElement)
  }

export const showMaxTemperature = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    const values = weatherData.map(d => d.value)
    const maxTemp = Math.max(...values)
      const weatherDataElement = document.createElement('p');
      weatherDataElement.innerText = `Max Temp value: ${maxTemp}`
      weatherDataDiv.append(weatherDataElement)
  }

export const showTotalPrecipitation = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    const values = weatherData.map(d => d.value)
    const total = values.reduce((a,b) => a+b, 0).toFixed(1)
      const weatherDataElement = document.createElement('p');
      weatherDataElement.innerText = `Total precipitation: ${total}`
      weatherDataDiv.append(weatherDataElement)
  }

export const showAverageWindSpeed = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    const values = weatherData.map(d => d.value)
    const average = (values.reduce((a,b) => a+b, 0) / values.length).toFixed(1)
      const weatherDataElement = document.createElement('p');
      weatherDataElement.innerText = `Average wind speed: ${average}`
      weatherDataDiv.append(weatherDataElement)
  }

  export const showWeatherDataForecasts = (weatherForecasts, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsForecast[place]);
    const weatherDataElement = document.createElement('p');
    weatherDataElement.innerText = `${JSON.stringify(weatherForecasts)}`
    weatherDataDiv.append(weatherDataElement)
  }

  export const displayError = e => {
    const msg_board = document.getElementById('error-message')
    msg_board.innerText = e
}
