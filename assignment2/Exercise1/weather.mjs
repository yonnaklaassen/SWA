export function Weather(data) {
    let placeFilter = null
    let typeFilter = null
    let periodFilter = null

    function getPlaceFilter() {
        return placeFilter
    }

    function setPlaceFilter(place) {
        placeFilter = place
    }

    function clearPlaceFilter() {
        placeFilter = null
    }

    function getTypeFilter() {
        return typeFilter
    }

    function setTypeFilter(type) {
        typeFilter = type
    }

    function clearTypeFilter() {
        typeFilter = null
    }

    function getPeriodFilter() {
        return periodFilter
    }

    function setPeriodFilter(period) {
        periodFilter = period
    }

    function clearPeriodFilter() {
        periodFilter = null
    }

    function clearAllFilters() {
        clearTypeFilter()
        clearPlaceFilter()
        clearPeriodFilter()
    }

    function forFilter(f) {
        clearAllFilters()
        f()
        let result = getFilteredData()
        clearAllFilters()
        return WeatherHistory(result)
    }

    function forPlace(place) {
        return forFilter(() => setPlaceFilter(place))
    }

    function forType(type) {
        return forFilter(() => setTypeFilter(type))
    }

    function forPeriod(period){
        return forFilter(()=> setPeriodFilter(period))
    }

    function including(_data) {
        let result = data.map( () => data.some( r => _data.including(r)))
        return Weather(result)
    }

    function convertToUsUnits() {
        data.forEach((weatherPrediction) => {
            switch (weatherPrediction.getType()) {
                case "Temperature":
                    if (weatherPrediction.getUnit() == "C") {
                        weatherPrediction.convertToF()
                    }
                    break;
                case "Precipitation":
                    if (weatherPrediction.getUnit() == "mm") {
                        weatherPrediction.convertToInches()
                    }
                    break;
                case "Wind":
                    if (weatherPrediction.getUnit() == "ms") {
                        weatherPrediction.convertToMPH()
                    }
                    break;
            }

        })
    }

    function convertToInternationalUnits() {
        data.forEach((weatherPrediction) => {
            switch (weatherPrediction.getType()) {
                case "Temperature":
                    if (weatherPrediction.getUnit() == "F") {
                        weatherPrediction.convertToC()
                    }
                    break;
                case "Precipitation":
                    if (weatherPrediction.getUnit() == "inch") {
                        weatherPrediction.convertToMM()
                    }
                    break;
                case "Wind":
                    if (weatherPrediction.getUnit() == "mph") {
                        weatherPrediction.convertToMM()
                    }
                    break;
            }
        })
    }

    function add(_data) {
        data.push(..._data)
    }

    function getFilteredData() {
        if (placeFilter == null) {
            if (typeFilter == null) {
                if (periodFilter == null) {
                    return data
                } else {
                    return data.filter(d => periodFilter.contains(d.getTime()))
                }
            } else {
                if (periodFilter == null) {
                    return data.filter(d => d.getType() === typeFilter)
                } else {
                    return data.filter(d => periodFilter.contains(d.getTime()) && d.getType() === typeFilter)
                }
            }
        } else {
            if (typeFilter == null) {
                if (periodFilter == null) {
                    return data.filter(d => d.getPlace() === placeFilter)
                } else {
                    return data.filter(d => d.getPlace() === placeFilter && periodFilter.contains(d.getTime()))
                }
            } else {
                if (periodFilter == null) {
                    return data.filter(d => d.getPlace() === placeFilter && d.getType() === typeFilter)
                } else {
                    return data.filter(d => d.getPlace() === placeFilter && d.getType() === typeFilter && periodFilter.contains(d.getTime()))
                }
            }
        }
    }

    function getData() {
        return data
    }

    function checkIfEmptyOrDifferentTypes() {
        if(data.length === 0){
            return undefined
        } else if (!data.every( _data => _data.type === data[0].type)){
            return undefined
        }
    }

    return {
        forPlace,
        forType,
        forPeriod,
        including,
        convertToUsUnits,
        convertToInternationalUnits,
        getData,
        checkIfEmptyOrDifferentTypes
    }
}