function unitConverter() {
    function convertToC(value) {
        return (value -32) / 1.8
    }
    
    function convertToF(value) {
        return (value * 1.8) + 32
    }
    
    function convertToMM(value) {
        return (value * 25.4)
    }
    
    function convertToInches(value) {
        return (value / 25.4)
    }
    
    function convertToMPH(value) {
        return (value * 0.44704)
    }
    
    function convertToMS(value) {
        return (value / 0.44704)
    }

    return {
        convertToF,
        convertToC,
        convertToMM,
        convertToInches,
        convertToMPH,
        convertToMS
    }
    
}

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

Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype)
Temperature.prototype.constructor = Temperature
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
function Precipitation(time, place, type, unit, value, precipitationType) {
    WeatherData.call(this, time, place, type, unit, value)
    this.precipitationType = precipitationType
}

Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype)
Precipitation.prototype.constructor = Precipitation
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
function Wind(time, place, type, unit, value, direction) {
    WeatherData.call(this, time, place, type, unit, value)
    this.direction = direction
}

Object.setPrototypeOf(Wind.prototype, WeatherData.prototype)
Wind.prototype.constructor = Wind
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
        return new WeatherHistory(data.filter(d => period.contains(d.getTime())))
    }

    function including(data) {
        return new WeatherHistory(data.filter(d => data.contains(d)))
    }

    function convertToUsUnits() {
        data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'C') d.value = (d.value * 1.8) + 32
                data.unit = 'F'
                break;
            case 'Precipitation':
                if(data.getUnit() === 'MM') d.value = (d.value / 25.4)
                data.unit = 'Inch'
                break;
            case 'Wind':
                if(data.getUnit() === 'MS') d.value = (d.value * 0.44704)
                data.unit = 'MPH'
                break;
            }
        })
    }

    function convertToInternationalUnits() {
        data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'F') d.value = (d.value -32) / 1.8
                data.unit = 'C'
                break;
            case 'Precipitation':
                if(data.getUnit() === 'Inch') d.value = (d.value * 25.4)
                data.unit = 'MM'
                break;
            case 'Wind':
                if(data.getUnit() === 'MPH') d.value = (d.value / 0.44704)
                data.unit = 'MS'
                break;
            }
        })
    }

    function lowestValue() {
        if(data.length != 0 ) {
            let lowestValue = data[0].getValue()
            const firstType = data[0].getType()

            for(let i = 1; i < data.length; i++) {
                if(firstType != data[i].getType()) return undefined
            }

            for(let i = 1; i < data.length; i++) {
                if(lowestValue > data[i].getValue()) {
                    lowestValue = data[i]
                }
            }
            return lowestValue
        }
        return undefined
    }

    function getData() {
        return this.data
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

Object.setPrototypeOf(TemperaraturePrediction.prototype, WeatherPrediction.prototype)
TemperaraturePrediction.prototype.constructor = TemperaraturePrediction
TemperaraturePrediction.convertToF = function() {
    this.minValue = (this.minValue * 1.8) + 32
    this.maxValue = (this.maxValue * 1.8) + 32
    this.unit = 'F'
    return new TemperaraturePrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}
TemperaraturePrediction.convertToC = function() {
    this.minValue = (this.minValue -32) / 1.8
    this.maxValue = (this.maxValue -32) / 1.8
    this.unit = 'C'
    return new TemperaraturePrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}

//PrecipitationPrediction
function PrecipitationPrediction(time, place, type, unit, minValue, maxValue, expectedTypes) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedTypes = expectedTypes
}

Object.setPrototypeOf(PrecipitationPrediction.prototype, WeatherPrediction.prototype)
PrecipitationPrediction.prototype.constructor = PrecipitationPrediction
PrecipitationPrediction.prototype.getExpectedTypes = function() {return this.expectedTypes}
PrecipitationPrediction.prototype.convertToInches = function() {
    this.minValue = (this.minValue / 25.4)
    this.maxValue = (this.maxValue / 25.4)
    this.unit = 'Inch'
    return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue, this.expectedTypes)
}
PrecipitationPrediction.prototype.convertToMM = function() {
    this.minValue = (this.minValue * 25.4)
    this.maxValue = (this.maxValue * 25.4)
    this.unit = 'MM'
    return new PrecipitationPrediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue, this.expectedTypes)
}

//Windprediction
function Windprediction(time, place, type, unit, minValue, maxValue, expectedDirections) {
    WeatherPrediction.call(this, time, place, type, unit, minValue, maxValue)
    this.expectedDirections = expectedDirections
}

Object.setPrototypeOf(Windprediction.prototype, WeatherPrediction.prototype)
Windprediction.prototype.constructor = Windprediction
Windprediction.prototype.getExpectedDirections = function() {return this.expectedDirections}
Windprediction.prototype.convertToMPH = function() {
    this.minValue = (this.minValue * 0.44704)
    this.maxValue = (this.maxValue * 0.44704)
    this.unit = 'MPH'
    return new Windprediction(this.time, this.place, this.type, this.unit, this.minValue, this.maxValue)
}
Windprediction.prototype.convertToMS = function() {
    this.minValue = (this.minValue / 0.44704)
    this.maxValue = (this.maxValue / 0.44704)
    this.unit = 'MS'
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
         return new WeatherForecast(data.filter(d => period.contains(d.getTime())))
     }
 
     function including(data) {
         return new WeatherForecast(data.filter(d => data.contains(d)))
     }
 
     function convertToUsUnits() {
        data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'C') {
                    d.minValue = (d.minValue * 1.8) + 32
                    d.maxValue = (d.maxValue * 1.8) + 32
                    data.unit = 'F'
                } 
                break;
            case 'Precipitation':
                if(data.getUnit() === 'MM') {
                d.minValue = (d.minValue / 25.4)
                d.maxValue = (d.maxValue / 25.4)
                data.unit = 'Inch'
                } 
                break;
            case 'Wind':
                if(data.getUnit() === 'MS') {
                d.minValue = (d.minValue * 0.44704)
                d.maxValue = (d.maxValue * 0.44704)
                data.unit = 'MPH'
                } 
                break;
            }
        })
     }
 
     function convertToInternationalUnits() {
        data.forEach(data => {
            switch(data.getType())
            {
            case 'Temperature':
                if(data.getUnit() === 'F') {
                d.minValue = (d.minValue -32) / 1.8
                d.maxValue = (d.maxValue -32) / 1.8
                data.unit = 'C'
                } 
                break;
            case 'Precipitation':
                if(data.getUnit() === 'Inch') {
                d.minValue = (d.minValue * 25.4)
                d.maxValue = (d.maxValue * 25.4)
                data.unit = 'MM'
                } 
                break;
            case 'Wind':
                if(data.getUnit() === 'MPH') {
                d.minValue = (d.minValue / 0.44704)
                d.maxValue = (d.maxValue / 0.44704)
                data.unit = 'MS'
                } 
                break;
            }
        })
     }
 
     function getAverageMinValue() {
        let values = []
        data.forEach(data => {
            values.push(data.getMin())
        })
        values.sort(function(a, b){return a-b});
        return values[0]
     }

     function getAverageMaxValue() {
        let values = []
        data.forEach(data => {
            values.push(data.getMax())
        })
        values.sort(function(a, b){return b-a});
        return values[0]
     }
 
     function getPredictions() {
         return this.data
     }
 
     return {
         forPlace,
         forType,
         forPeriod,
         including,
         getAverageMaxValue,
         getAverageMinValue,
         getPredictions,
         convertToUsUnits,
         convertToInternationalUnits
     }
}

var date = new Date(2021, 8, 15)
// var date2 = new Date(2021, 10, 30)
// let weatherDataArray = [new WeatherData(date, 'Horsens', 'Temperature', 'C', '20'),
// new WeatherData(date2, 'Århus', 'Temperature', 'C', '16'),
// new WeatherData(date2, 'Skanderborg', 'Wind', 'MPH', '200'),
// new WeatherData(date2, 'Skanderborg', 'Temperature', 'F', '300')]
// const weatherHistory = new WeatherHistory(weatherDataArray)
// const dateInt = new DateInterval(new Date(2021, 8, 10), new Date(2021, 8, 20))
// console.log(weatherHistory.forPeriod(dateInt))

//  const weatherData = new WeatherData(date, 'place', 'type', 'unit', 3434)
//  console.log(weatherData.getTime())

// const temp = new Temperature(date, 'place', 'Temperature', 'unit', 3434)
// temp.convertToF()
// console.log(temp.getValue())

//  const pre = new Precipitation(date, 'place', 'Precipitation', 'unit', 3434, 'pType')
//  const pre2 = pre.convertToInches()
//  console.log(pre2.getValue())

//   const wind = new Wind(date, 'place', 'wind', 'Unit', 3434, 'pType')
//   const wind2 = wind.convertToMPH()
//   console.log(wind2.getValue())

// const wd = new WeatherData(date, 'place', 'type', 'unit', 3434)
// console.log(wd.getValue().convertToF())