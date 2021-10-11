const querySelectorsData = ['#horsens-data', '#aarhus-data', '#copenhagen-data']
const querySelectorsForecast = ['#horsens-forecast', '#aarhus-forecast', '#copenhagen-forecast']

export const getDataFromLast5Days = (data, place) => {
      const today = new Date()
      let recent5Days = new Date()
      return data.filter(d => d.place === place && new Date(d.time) > recent5Days.setDate(today.getDate() -5))
        .sort((a, b) => b.time > a.time ? 1: -1)
}

export const displayLatestWeatherData = (weatherData, place) => {
    const weatherDataDiv = document.querySelector(querySelectorsData[place]);
    weatherData.forEach(data  => {
      const weatherDataElement = document.createElement('p');
      weatherDataElement.innerText = JSON.stringify(data)
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
