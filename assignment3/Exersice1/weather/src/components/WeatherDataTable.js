import React, {Component} from 'react'
import {connect } from 'react-redux'
import {fetchWeatherData, postHistoricData, getDataByTime } from '../actions/weatherActions'
import PropTypes from 'prop-types'
import mapStateToProps from '../utility/stateToPropsMapper'


class WeatherDataTable extends Component {
    constructor(props) {
        super(props)

        this.onReLoad = this.onReLoad.bind(this)
    }

    componentWillMount() {
        this.props.fetchWeatherData()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newHistoricData) {
            this.props.historicData.unshift(nextProps.newHistoricData)
        }
    }

    onReLoad(e) {
        this.props.fetchWeatherData() 
    }

    render() {
    return (
        <>
        <div className="main">
        <button type="button" onClick={this.onReLoad}>Reload</button>
        <table id="historicData">
        <thead><tr><td>Value</td><td>Unit</td><td>Type</td><td>Place</td><td>Time</td></tr></thead>
        <HistoricWeatherDisplay {...this.props}/>
        </table>
        <table id="forecastData">
        <thead><tr><td>From</td><td>To</td><td>Unit</td><td>Type</td><td>Place</td><td>Time</td></tr></thead>
        <ForecastWeatherDisplay {...this.props}/>
        </table>
        </div>
        </>
    )
    }
}

WeatherDataTable.propTypes = {
    fetchWeatherData: PropTypes.func.isRequired,
    historicData: PropTypes.array.isRequired,
    forecastData: PropTypes.array.isRequired,
    newHistoricData: PropTypes.object,
}

const HistoricWeatherDisplay = (props) => (
    <tbody>
        {
            props.historicData.map((weatherData, index) => <WeatherDataRow  key={index}{...{weatherData}}/>)
        }
    </tbody>
)

const ForecastWeatherDisplay = (props) => (
 <tbody>
     {
         props.forecastData.map((forecast, index) => <ForecastRow  key={index}{...{forecast}}/>)
     }
 </tbody>

)

const WeatherDataRow = (props) => (
    <tr>
        <WeatherData {...props}/>
    </tr>
   )
   
   
   const ForecastRow = (props) => (
       <tr>
           <ForecastData {...props}/>
       </tr>
   )

const WeatherData = ({weatherData}) => [
    <td key='value'>{weatherData.value}</td>,
    <td key='unit'>{weatherData.unit}</td>,
    <td key='type'>{weatherData.type}</td>,
    <td key='place'>{weatherData.place}</td>,
    <td key='time'>{weatherData.time}</td>
] 

const ForecastData = ({forecast}) => [
 <td key='from'>{forecast.from}</td>,
 <td key='to'>{forecast.to}</td>,
 <td key='unit'>{forecast.unit}</td>,
 <td key='type'>{forecast.type}</td>,
 <td key='place'>{forecast.place}</td>,
 <td key='time'>{forecast.time}</td>
] 


export default connect(mapStateToProps, {fetchWeatherData, postHistoricData, getDataByTime })(WeatherDataTable)