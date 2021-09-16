//DateInterval
function DateInterval(fromDate, toDate) {
    return {
        getFrom() {
            return fromDate
        },
        getTo() {
            return toDate
        },
        contains(date) {
            if(date > fromDate && date < toDate ) {
                return true;
            }
             return false;
        }
    }
}

//Event
function Event1(time, place) {

    this.time = time
    this.place = place
}

Event1.prototype.getTime = function() {return this.time}
Event1.prototype.getPlace = function() {return this.place}

//DataType
function DataType(type, unit) {
    this.type = type
    this.unit = unit
}

DataType.prototype.getType = function() {return this.type}
DataType.prototype.getUnit = function() {return this.unit}


//WeatherData
function WeatherData(time, place, type, unit, value) {
    Event1.call(this, time, place)
    DataType.call(this, type, unit)
    this.value = value
}

WeatherData.prototype = Object.create(Event1.prototype)
Object.assign(WeatherData.prototype, DataType.prototype)

WeatherData.prototype.getValue = function() {return this.value}

//Temperature
function Temperature(time, place, type, unit, value) {
    WeatherData.call(this, time, place, type, unit, value)
}

Temperature.prototype = Object.create(WeatherData.prototype)
Temperature.prototype.constructor = Temperature
Temperature.prototype.convertToF = function() { 
this.value = (this.value * 1.8) + 32
 return new Temperature(this.time, this.place, this.type, this.unit, this.value)
}
Temperature.prototype.convertToC = function() {
    this.value = (this.value -32) / 1.8
    return new Temperature(this.time, this.place, this.type, this.unit, this.value)
}

//Precipitation
function Precipitation(time, place, type, unit, value, precipitationType) {
    WeatherData.call(this, time, place, type, unit, value)
    this.precipitationType = precipitationType
}

Precipitation.prototype = Object.create(WeatherData.prototype)
Precipitation.prototype.constructor = Precipitation
Precipitation.prototype.getParticipationType = function() {return this.precipitationType}
Precipitation.prototype.convertToInches = function() {
this.value = (this.value / 25.4)
return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
}
Precipitation.prototype.convertToMM = function() {
    this.value = (this.value * 25.4)
    return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
}

//Wind
function Wind(time, place, type, unit, value, direction) {
    WeatherData.call(this, time, place, type, unit, value)
    this.direction = direction
}
Wind.prototype = Object.create(WeatherData.prototype)
Wind.prototype.constructor = Wind
Wind.prototype.getDirection = function() {return this.direction}
Wind.prototype.convertToMPH = function() {
    this.value = (this.value * 0.44704)
    return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
}
Wind.prototype.convertToMS = function() {
    this.value = (this.value / 0.44704)
    return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
}

//WeatherHistory
function WeatherHistory(data) {
    this.data = data

   function forPlace(place) {
        return new WeatherHistory(data.filter(d => d.getPlace() === place))
    }

    function forType(type) {
        return new WeatherHistory(data.filter(d => d.getType() === type))
    }

    function forPeriod(period) {
        return data.filter(d => period.contains(d.getTime()))
    }

    function including(data) {
        return new WeatherHistory(data.filter(d => data.contains(d)))
    }

    function convertToUsUnits() {

    }

    function convertToInternationalUnits() {

    }


    function lowestValue() {

    }

    function getData() {
        
    }

    return {
        forPlace,
        forType,
        forPeriod,
        including,
        lowestValue,
        getData,
        convertToUsUnits,
        convertToInternationalUnits
    }

}

//Weather Prediction
function WeatherPrediction(time, place, type, unit, minValue, maxValue) {
    Event1.call(this, time, place)
    DataType.call(this, type, unit)
    this.minValue = minValue
    this.maxValue = maxValue
}

WeatherPrediction.prototype = Object.create(Event1.prototype)
WeatherPrediction.prototype.constructor = WeatherPrediction
Object.assign(WeatherPrediction.prototype, DataType.prototype)
WeatherPrediction.prototype.matches = function(data) {
    if(data.getTime() === this.time && data.getPlace() === this.place
    && data.getType() === this.type && data.unit === this.unit) {
        return true
    }
    return false
}
WeatherPrediction.prototype.getMin = function() {return this.minValue}
WeatherPrediction.prototype.getMax = function() {return this.maxValue}

//TemperaturePrediction
function TemperaraturePrediction(time, place, type, unit, minValue, maxValue) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
}

TemperaraturePrediction.prototype = Object.create(WeatherPrediction)
TemperaraturePrediction.prototype.constructor = TemperaraturePrediction
TemperaraturePrediction.convertToF = function() {
    this.minValue = (this.minValue * 1.8) + 32
    this.maxValue = (this.maxValue * 1.8) + 32
    return new TemperaraturePrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}
TemperaraturePrediction.convertToC = function() {
    this.minValue = (this.minValue -32) / 1.8
    this.maxValue = (this.maxValue -32) / 1.8
    return new TemperaraturePrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}

//PrecipitationPrediction
function PrecipitationPrediction(time, place, type, unit, minValue, maxValue, expectedTypes) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedTypes = expectedTypes
}

PrecipitationPrediction.prototype = Object.create(WeatherPrediction.prototype)
PrecipitationPrediction.prototype.constructor = PrecipitationPrediction
PrecipitationPrediction.prototype.getExpectedTypes = function() {return this.expectedTypes}
PrecipitationPrediction.prototype.convertToInches = function() {
    this.minValue = (this.minValue / 25.4)
    this.maxValue = (this.maxValue / 25.4)
    return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue, this.expectedTypes)
}
PrecipitationPrediction.prototype.convertToMM = function() {
    this.minValue = (this.minValue * 25.4)
    this.maxValue = (this.maxValue * 25.4)
    return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue, this.expectedTypes)
}

//Windprediction
function Windprediction(time, place, type, unit, minValue, maxValue, expectedDirections) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedDirections = expectedDirections
}

Windprediction.prototype = Object.create(WeatherPrediction.prototype)
Windprediction.prototype.constructor = Windprediction
Windprediction.prototype.getExpectedDirections = function() {return this.expectedDirections}
Windprediction.prototype.convertToMPH = function() {
    this.minValue = (this.minValue * 0.44704)
    this.maxValue = (this.maxValue * 0.44704)
    return new Windprediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}
Windprediction.prototype.convertToMS = function() {
    this.minValue = (this.minValue / 0.44704)
    this.maxValue = (this.maxValue / 0.44704)
    return new Windprediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}

//WeatherForecast
function WeatherForecast(data) {
    this.data = data

    function forPlace(place) {
         return new WeatherForecast(data.filter(d => d.getPlace() === place))
     }
 
     function forType(type) {
         return new WeatherForecast(data.filter(d => d.getType() === type))
     }
 
     function forPeriod(period) {
         return data.filter(d => period.contains(d.getTime()))
     }
 
     function including(data) {
         return new WeatherForecast(data.filter(d => data.contains(d)))
     }
 
     function convertToUsUnits() {
 
     }
 
     function convertToInternationalUnits() {
 
     }
 
 
     function lowestValue() {
 
     }
 
     function getData() {
         
     }
 
     return {
         forPlace,
         forType,
         forPeriod,
         including,
         lowestValue,
         getData,
         convertToUsUnits,
         convertToInternationalUnits
     }
}