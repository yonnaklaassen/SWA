import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getDataByTime } from '../actions/weatherActions'
import mapStateToProps from '../utility/stateToPropsMapper'

class TimeIntervalPicker extends Component {

    constructor(props) {
        super(props)

        this.onTimeIntervalSubmit = this.onTimeIntervalSubmit.bind(this)
    }

    onTimeIntervalSubmit(e) {
        const from = document.getElementById('from').value
        const to = document.getElementById('to').value

        if(from !== "" && to !== "") {
            this.props.getDataByTime(from, to)
        }
    }

    render() {
        return (
            <>
        From: <input id="from" type="datetime-local"></input>   To: <input id="to" type="datetime-local"></input>
        <button type="button" onClick={this.onTimeIntervalSubmit}>Submit</button>
        <br></br>
        <br></br>
            </>
        )
    }
}

TimeIntervalPicker.propTypes = {
    getDataByTime: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getDataByTime})(TimeIntervalPicker)