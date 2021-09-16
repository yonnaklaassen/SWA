//WeatherHistory
export function WeatherHistory(data) {
    this.data = data
    this.placeFilter = null
    this.typeFilter = null
    this.periodFilter = null

    this.getPlaceFilter = function() {
        return this.placeFilter
    }

    this.getPlaceFilter = function() {
        return this.placeFilter
    }

    this.setPlaceFilter = function(place) {
        this.placeFilter = place
    }

    this.clearPlaceFilter = function() {
        this.placeFilter = null
    }

    this.getTypeFilter = function() {
        return this.typeFilter
    }

    this.setTypeFilter = function(type) {
        this.typeFilter = type
    }

     this.clearTypeFilter = function() {
        this.typeFilter = null
    }

    this.getPeriodFilter = function() {
        return this.periodFilter
    }

    this.setPeriodFilter = function(period) {
        this.periodFilter = period
    }

    this.clearPeriodFilter = function() {
        this.periodFilter = null
    }

    this.convertToUsUnits = function() {
        this.data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'C') data.value = (data.value * 1.8) + 32
                data.unit = 'F'
                break;
            case 'Precipitation':
                if(data.getUnit() === 'MM') data.value = (data.value / 25.4)
                data.unit = 'Inch'
                break;
            case 'Wind':
                if(data.getUnit() === 'MS') data.value = (data.value * 0.44704)
                data.unit = 'MPH'
                break;
            }
        })
    }

    this.convertToInternationalUnits = function() {
        this.data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'F') data.value = (data.value -32) / 1.8
                data.unit = 'C'
                break;
            case 'Precipitation':
                if(data.getUnit() === 'Inch') data.value = (data.value * 25.4)
                data.unit = 'MM'
                break;
            case 'Wind':
                if(data.getUnit() === 'MPH') data.value = (data.value / 0.44704)
                data.unit = 'MS'
                break;
            }
        })
    }

    this.add = function(data) {
        this.data.push(...data)
    }

    this.getFilteredData = function() {
        let filteredData = []
        
    }
}