const mapStateToProps = state => ({
    historicData: state.weather.historicWeatherData,
    forecastData: state.weather.forecastWeatherData,
    newHistoricData: state.weather.newHistoricData
})

export default mapStateToProps