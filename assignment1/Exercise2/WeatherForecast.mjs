//WeatherForecast
export function WeatherForecast(data) {
    this.data = data
    this.placeFilter = null
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
                if(data.getUnit() === 'C') {
                    data.minValue = (data.minValue * 1.8) + 32
                    data.maxValue = (data.maxValue * 1.8) + 32
                    data.unit = 'F'
                } 
                break;
            case 'Precipitation':
                if(data.getUnit() === 'MM') {
                data.minValue = (data.minValue / 25.4)
                data.maxValue = (data.maxValue / 25.4)
                data.unit = 'Inch'
                } 
                break;
            case 'Wind':
                if(data.getUnit() === 'MS') {
                data.minValue = (data.minValue * 0.44704)
                data.maxValue = (data.maxValue * 0.44704)
                data.unit = 'MPH'
                } 
                break;
            }
        })
     }
 
     this.convertToInternationalUnits = function() {
        this.data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'F') {
                data.minValue = (data.minValue -32) / 1.8
                data.maxValue = (data.maxValue -32) / 1.8
                data.unit = 'C'
                } 
                break;
            case 'Precipitation':
                if(data.getUnit() === 'Inch') {
                data.minValue = (data.minValue * 25.4)
                data.maxValue = (data.maxValue * 25.4)
                data.unit = 'MM'
                } 
                break;
            case 'Wind':
                if(data.getUnit() === 'MPH') {
                data.minValue = (data.minValue / 0.44704)
                data.maxValue = (data.maxValue / 0.44704)
                data.unit = 'MS'
                } 
                break;
            }
        })
     }


     this.add = function(data) {
        this.data.push(...data)
    }
 
     this.getFilteredPredictions = function() {
         return this.data
     }
}