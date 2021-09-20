export function Weather(data) {
    this.data = data
    this.placeFilter = null
    this.typeFilter = null
    this.periodFilter = null
}

Weather.prototype.getPlace = function() { return this.placeFilter}
Weather.prototype.setPlaceFilter = function(place) {this.placeFilter = place}
Weather.prototype.clearPlaceFilter = function() {  this.placeFilter = null}
Weather.prototype.getTypeFilter = function() {return this.typeFilter}
Weather.prototype.setTypeFilter = function(type) {this.typeFilter = type}
Weather.prototype.clearTypeFilter = function() {this.typeFilter = null}
Weather.prototype.getPeriodFilter = function() {return this.periodFilter}
Weather.prototype.setPeriodFilter = function(period) {this.periodFilter = period}
Weather.prototype.clearPeriodFilter = function() {this.periodFilter = null}
Weather.prototype.convertToUsUnits = function(weatherType) {
    this.data.forEach(data => {
        switch(data.getType())
        {
        case 'Temperature':
            if(data.getUnit() === 'C') {
                if(weatherType === 'Forecast') {
                    data.minValue = (data.minValue * 1.8) + 32
                    data.maxValue = (data.maxValue * 1.8) + 32
                }
                else {
                    data.value = (data.value * 1.8) + 32
                }
      
                data.unit = 'F'
            } 
            break;
        case 'Precipitation':
            if(data.getUnit() === 'MM') {
                if(weatherType === 'Forecast') {
                    data.minValue = (data.minValue / 25.4)
                    data.maxValue = (data.maxValue / 25.4)
                }
                else {
                    data.value = (data.value / 25.4)
                }
            data.unit = 'Inch'
            } 
            break;
        case 'Wind':
            if(data.getUnit() === 'MS') {
                if(weatherType === 'Forecast') {
                    data.minValue = (data.minValue * 0.44704)
                    data.maxValue = (data.maxValue * 0.44704)
                }
                else {
                    data.value = (data.value * 0.44704)
                }
            data.unit = 'MPH'
            } 
            break;
        }
    })
}

Weather.prototype.convertToInternationalUnits = function(weatherType) {
        this.data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'F') {
                    if(weatherType === 'Forecast') {
                        data.minValue = (data.minValue -32) / 1.8
                        data.maxValue = (data.maxValue -32) / 1.8
                    }else {
                        data.value = (data.value -32) / 1.8
                    }
            
                data.unit = 'C'
                } 
                break;
            case 'Precipitation':
                if(data.getUnit() === 'Inch') {
                    if(weatherType === 'Forecast') {
                data.minValue = (data.minValue * 25.4)
                data.maxValue = (data.maxValue * 25.4)
                    }
                    else {
                        data.value = (data.value * 25.4)
                    }
                data.unit = 'MM'
                } 
                break;
            case 'Wind':
                if(data.getUnit() === 'MPH') {
                    if(weatherType === 'Forecast') {
                data.minValue = (data.minValue / 0.44704)
                data.maxValue = (data.maxValue / 0.44704)
                    }
                    else {
                        data.value = (data.value / 0.44704)
                    }
                data.unit = 'MS'
                } 
                break;
            }
        })
}

Weather.prototype.add = function(data) {this.data.push(...data)}
Weather.prototype.getFilteredData = function() {
    if(this.placeFilter==null){
        if(this.typeFilter==null){
            if(this.periodFilter==null){
                return this.data
            }else{
                return this.data.filter(d => this.periodFilter.contains(d.getTime()))
            }
        }else{
            if(this.periodFilter==null){
                return this.data.filter(d => d.getType()===this.typeFilter)
            }else{
                return this.data.filter(d => this.periodFilter.contains(d.getTime()) && d.getType()===this.typeFilter)
            }
        }
    }else{
        if(this.typeFilter==null){
            if(this.periodFilter==null){
                return this.data.filter(d => d.getPlace()===this.placeFilter) 
            }else {
                return this.data.filter(d => d.getPlace()===this.placeFilter && this.periodFilter.contains(d.getTime()))
            }
        }else {
            if(this.periodFilter==null){
                return this.data.filter(d => d.getPlace()===this.placeFilter && d.getType()=== this.typeFilter)
            }else{
                return this.data.filter(d => d.getPlace()===this.placeFilter && d.getType()=== this.typeFilter && this.periodFilter.contains(d.getTime()))
            }
        }
    }
}

//WeatherForecast
export function WeatherForecast(data) {
    Weather.call(this, data)
}

WeatherForecast.prototype = Object.create(Weather.prototype)

//WeatherHistory
export function WeatherHistory(data) {
    Weather.call(this, data)
}

WeatherHistory.prototype = Object.create(Weather.prototype)