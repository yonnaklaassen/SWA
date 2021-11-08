import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getDataByPlace} from '../actions/weatherActions'
import mapStateToProps from '../utility/stateToPropsMapper'

class CitySelector extends Component {
    constructor(props) {
        super(props)

        this.onCityChange = this.onCityChange.bind(this)
    }

    onCityChange(e) {
        const place = document.getElementById('city-selector')
        if(place.value !== "") {
            this.props.getDataByPlace(place.value)
        }
    }

    render() {
        return (
            <>
    <label>
       Select a city:
       <select id="city-selector" onChange= {this.onCityChange} >
         <option value="">--Choose a city--</option>
         <option value='Copenhagen'>Copenhagen</option>
         <option value='Aarhus'>Aarhus</option>
         <option value='Horsens'>Horsens</option>
       </select>
        </label>
        <br></br>
        <br></br>
            </>
        )
    }
}

CitySelector.propTypes = {
    getDataByPlace: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, {getDataByPlace})(CitySelector)