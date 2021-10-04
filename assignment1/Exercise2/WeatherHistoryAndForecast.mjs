export class Weather {
    constructor(data) {
        this.data = data
        this.placeFilter = null
        this.typeFilter = null
        this.periodFilter = null
    }

    getPlace() {
        return this.placeFilter
    }

    setPlaceFilter(place) {
        this.placeFilter = place
    }

    clearPlaceFilter() {
        this.placeFilter = null
    }

    getTypeFilter() {
        return this.typeFilter
    }

    setTypeFilter(type) {
        this.typeFilter = type
    }

    clearPeriodFilter() {
        this.typeFilter = null
    }

    getPeriodFilter() {
        return this.periodFilter
    }

    setPeriodFilter(period) {
        this.periodFilter = period
    }

    clearPeriodFilter() {
        this.periodFilter = null
    }

    convertToUsUnits(weatherType) {
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

    convertToInternationalUnits(weatherType) {
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

    add(data) {
        this.data.push(...data)
    }

    getFilteredData() {
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
}

//WeatherForecast
export class WeatherForecast extends Weather {
    constructor(data) {
        super(data)
    }
}


//WeatherHistory
export class WeatherHistory extends Weather {
    constructor(data) {
        super(data)
    }
}
