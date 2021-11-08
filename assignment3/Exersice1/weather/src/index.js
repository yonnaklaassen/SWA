import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js'
import {Provider} from 'react-redux'
import WeatherDataTable from './components/WeatherDataTable';
import CitySelector from './components/CitySelector';
import TimeIntervalPicker from './components/TimeIntervalPicker';
import SubmitHistoricData from './components/SubmitHistoricData';


ReactDOM.render(
  <Provider store= {store}>
    <CitySelector/>
    <TimeIntervalPicker/>
    <SubmitHistoricData/>
    <WeatherDataTable/>
  </Provider>,
  document.getElementById('root')
);
