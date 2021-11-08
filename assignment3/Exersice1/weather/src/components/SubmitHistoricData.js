import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { postHistoricData} from '../actions/weatherActions'
import mapStateToProps from '../utility/stateToPropsMapper'

class SubmitHistoricData extends Component {
    constructor(props) {
        super(props)

        this.onSubmitNewHistoricData = this.onSubmitNewHistoricData.bind(this)
    }

    onSubmitNewHistoricData(e) {
        const value = document.getElementById('value')
        const unit = document.getElementById('unit')
        const type = document.getElementById('type-input')
        const place = document.getElementById('city-input')
        
        if(value !== null && unit !== null &&
            value.value !== "" && unit.value !== "" && place.value !== "" && type.value !== "") {
            const data = {
                value: value.value,
                unit: unit.value,
                type: type.value,
                place: place.value,
                time: new Date(Date.now()).toISOString()
            }

            this.props.postHistoricData(data)
            value.value = null
            unit.value = null
            type.selectedIndex = 0
            place.selectedIndex = 0
        }
    }

    render() {
        return (
            <>
        Value:<input id="value" type="text"></input>
        Unit: <input id="unit" type="text"></input>
        <select id="type-input" >
        <option value="">--Choose a type--</option>
         <option value='temperature'>Temperature</option>
         <option value='wind'>Wind</option>
         <option value='precipitation'>Precipitation</option>
         <option value='cloud'>Cloud</option>
       </select>
        <select id="city-input" >
        <option value="">--Choose a city--</option>
         <option value='Copenhagen'>Copenhagen</option>
         <option value='Aarhus'>Aarhus</option>
         <option value='Horsens'>Horsens</option>
       </select>
       <button type="button"onClick={this.onSubmitNewHistoricData}>Submit</button>
        <br></br>
        <br></br>
            </>
        )
    }
}

SubmitHistoricData.propTypes = {
    postHistoricData: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {postHistoricData})(SubmitHistoricData)