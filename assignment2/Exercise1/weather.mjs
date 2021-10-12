export function Weather(data) {
    let placeFilter = null
    let typeFilter = null
    let periodFilter = null

    function setPlaceFilter(place) {
        placeFilter = place
    }

    function clearPlaceFilter() {
        placeFilter = null
    }

    function setTypeFilter(type) {
        typeFilter = type
    }

    function clearTypeFilter() {
        typeFilter = null
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
        return Weather(result)
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
        let converted = data.map((weatherPrediction) => {
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
        return Weather(converted)
    }

    function convertToInternationalUnits() {
        let converted = data.map((weatherPrediction) => {
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
        return Weather(converted)
    }

    function getFilteredData() {
        let filtered;
        if (placeFilter == null) {
            if (typeFilter == null) {
                if (periodFilter == null) {
                    filtered = data
                } else {
                    filtered = data.filter(d => periodFilter.contains(d.getTime()))
                }
            } else {
                if (periodFilter == null) {
                    filtered = data.filter(d => d.getType() === typeFilter)
                } else {
                    filtered = data.filter(d => periodFilter.contains(d.getTime()) && d.getType() === typeFilter)
                }
            }
        } else {
            if (typeFilter == null) {
                if (periodFilter == null) {
                    filtered = data.filter(d => d.getPlace() === placeFilter)
                } else {
                    filtered = data.filter(d => d.getPlace() === placeFilter && periodFilter.contains(d.getTime()))
                }
            } else {
                if (periodFilter == null) {
                    filtered = data.filter(d => d.getPlace() === placeFilter && d.getType() === typeFilter)
                } else {
                    filtered = data.filter(d => d.getPlace() === placeFilter && d.getType() === typeFilter && periodFilter.contains(d.getTime()))
                }
            }
        }
        return Weather(filtered)
    }

    function getData() {
        return Weather(data)
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