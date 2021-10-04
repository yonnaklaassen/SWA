//DateInterval
export function DateInterval(fromDate, toDate) {
    return {
        getFrom() {
            return fromDate
        },
        getTo() {
            return toDate
        },
        contains(date) {
            return date > fromDate && date < toDate
        }
    }
}

//Event
export function Event(time, place) {
    this.time = time
    this.place = place
}

Event.prototype.getTime = function() {return this.time}
Event.prototype.getPlace = function() {return this.place}

//DataType
export function DataType(type, unit) {
    this.type = type
    this.unit = unit
}

DataType.prototype.getType = function() {return this.type}
DataType.prototype.getUnit = function() {return this.unit}


//WeatherData
export function WeatherData(time, place, type, unit, value) {
    Event.call(this, time, place)
    DataType.call(this, type, unit)
    this.value = value
}

WeatherData.prototype = Object.create(Event.prototype)
Object.assign(WeatherData.prototype, DataType.prototype)

WeatherData.prototype.getValue = function() {return this.value}

//Temperature
export function Temperature(time, place, type, unit, value) {
    WeatherData.call(this, time, place, type, unit, value)
}

Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype)
Temperature.prototype.convertToF = function() { 
this.value = (this.value * 1.8) + 32
this.unit = 'F'
 return new Temperature(this.time, this.place, this.type, this.unit, this.value)
}
Temperature.prototype.convertToC = function() {
    this.value = (this.value -32) / 1.8
    this.unit = 'C'
    return new Temperature(this.time, this.place, this.type, this.unit, this.value)
}

//Precipitation
export function Precipitation(time, place, type, unit, value, precipitationType) {
    WeatherData.call(this, time, place, type, unit, value)
    this.precipitationType = precipitationType
}

Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype)
Precipitation.prototype.getParticipationType = function() {return this.precipitationType}
Precipitation.prototype.convertToInches = function() {
this.value = (this.value / 25.4)
this.unit = 'Inch'
return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
}
Precipitation.prototype.convertToMM = function() {
    this.value = (this.value * 25.4)
    this.unit = 'MM'
    return new Precipitation(this.time, this.place, this.type, this.unit, this.value, this.precipitationType)
}

//Wind
export function Wind(time, place, type, unit, value, direction) {
    WeatherData.call(this, time, place, type, unit, value)
    this.direction = direction
}

Object.setPrototypeOf(Wind.prototype, WeatherData.prototype)
Wind.prototype.getDirection = function() {return this.direction}
Wind.prototype.convertToMPH = function() {
    this.value = (this.value * 0.44704)
    this.unit = 'MPH'
    return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
}
Wind.prototype.convertToMS = function() {
    this.value = (this.value / 0.44704)
    this.unit = 'MS'
    return new Wind(this.time, this.place, this.type, this.unit, this.value, this.direction)
}

//CloudCoverage
export function CloudCoverage(time, place, type, unit, value,) {
    WeatherData.call(this, time, place, type, unit, value)
}

Object.setPrototypeOf(CloudCoverage.prototype, WeatherData.prototype)

//Weather Prediction
export function WeatherPrediction(time, place, type, unit, minValue, maxValue) {
    Event.call(this, time, place)
    DataType.call(this, type, unit)
    this.minValue = minValue
    this.maxValue = maxValue
}

WeatherPrediction.prototype = Object.create(Event.prototype)
Object.assign(WeatherPrediction.prototype, DataType.prototype)
WeatherPrediction.prototype.matches = function(data) {
    if(data.getTime() === this.time && data.getPlace() === this.place
    && data.getType() === this.type && data.unit === this.unit && data.value >= this.minValue && data.value <= this.maxValue) {
        return true
    }
    return false
}
WeatherPrediction.prototype.getMin = function() {return this.minValue}
WeatherPrediction.prototype.getMax = function() {return this.maxValue}

//TemperaturePrediction
export function TemperaraturePrediction(time, place, type, unit, minValue, maxValue) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
}

Object.setPrototypeOf(TemperaraturePrediction.prototype, WeatherPrediction.prototype)
TemperaraturePrediction.prototype.convertToF = function() {
    this.minValue = (this.minValue * 1.8) + 32
    this.maxValue = (this.maxValue * 1.8) + 32
    this.unit = 'F'
}
TemperaraturePrediction.prototype.convertToC = function() {
    this.minValue = (this.minValue -32) / 1.8
    this.maxValue = (this.maxValue -32) / 1.8
    this.unit = 'C'
}

//PrecipitationPrediction
export function PrecipitationPrediction(time, place, type, unit, minValue, maxValue, expectedTypes) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedTypes = expectedTypes
}

Object.setPrototypeOf(PrecipitationPrediction.prototype, WeatherPrediction.prototype)
PrecipitationPrediction.prototype.getExpectedTypes = function() {return this.expectedTypes}
PrecipitationPrediction.prototype.convertToInches = function() {
    this.minValue = (this.minValue / 25.4)
    this.maxValue = (this.maxValue / 25.4)
    this.unit = 'Inch'
}
PrecipitationPrediction.prototype.convertToMM = function() {
    this.minValue = (this.minValue * 25.4)
    this.maxValue = (this.maxValue * 25.4)
    this.unit = 'MM'
}

//Windprediction
export function WindPrediction(time, place, type, unit, minValue, maxValue, expectedDirections) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedDirections = expectedDirections
}

Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction.prototype)
WindPrediction.prototype.getExpectedDirections = function() {return this.expectedDirections}
WindPrediction.prototype.convertToMPH = function() {
    this.minValue = (this.minValue * 0.44704)
    this.maxValue = (this.maxValue * 0.44704)
    this.unit = 'MPH'
}
WindPrediction.prototype.convertToMS = function() {
    this.minValue = (this.minValue / 0.44704)
    this.maxValue = (this.maxValue / 0.44704)
    this.unit = 'MS'
}

//Cloud coverage prediction
export function CloudCoveragePrediction(time, place, type, unit, minValue, maxValue) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
}

Object.setPrototypeOf(CloudCoveragePrediction.prototype, WeatherPrediction.prototype)
