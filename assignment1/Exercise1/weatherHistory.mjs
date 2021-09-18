export function WeatherHistory(data) {
    let placeFilter = null
    let typeFilter = null
    let periodFilter = null

    function getPlaceFilter() {
        return placeFilter
    }
    function setPlaceFilter(place) {
        placeFilter = place
    }
    function clearPlaceFilter(){placeFilter=null}

    function getTypeFilter(){
        return typeFilter
    }
    function setTypeFilter(type){typeFilter=type}
    function clearTypeFilter(){typeFilter=null}
    function getPeriodFilter(){return periodFilter}
    function setPeriodFilter(period){periodFilter = period}
    function clearPeriodFilter(){periodFilter=null}

    function convertToUsUnits() {
        data.forEach((weatherData) => {
            switch (weatherData.getType()) {
                case "Temperature":
                    if (weatherData.getUnit() == "C") {
                        weatherData.convertToF()
                    }
                    break;
                case "Precipitation":
                    if (weatherData.getUnit() == "mm") {
                        weatherData.convertToInches()
                    }
                    break;
                case "Wind":
                    if (weatherData.getUnit() == "ms") {
                        weatherData.convertToMPH()
                    }
                    break;
            }

        })
    }

    function convertToInternationalUnits() {
        data.forEach((weatherData) => {
            switch (weatherData.getType()) {
                case "Temperature":
                    if (weatherData.getUnit() == "F") {
                        weatherData.convertToC()
                    }
                    break;
                case "Precipitation":
                    if (weatherData.getUnit() == "inch") {
                        weatherData.convertToMM()
                    }
                    break;
                case "Wind":
                    if (weatherData.getUnit() == "mph") {
                        weatherData.convertToMM()
                    }
                    break;
            }
        })
    }

    function add(_data) {
        return data.push(..._data)
    }

    function getFilteredData() {
        if(placeFilter==null){
            if(typeFilter==null){
                if(periodFilter==null){
                    return []
                }else{
                    return data.filter(d => periodFilter.contains(d.getTime()))
                }
            }else{
                if(periodFilter==null){
                    return data.filter(d => d.getType()===typeFilter)
                }else{
                    return data.filter(d => periodFilter.contains(d.getTime()) && d.getType()===typeFilter)
                }
            }
        }else{
            if(typeFilter==null){
                if(periodFilter==null){
                    return data.filter(d => d.getPlace()===placeFilter)
                }else {
                    return data.filter(d => d.getPlace()===placeFilter && periodFilter.contains(d.getTime()))
                }
            }else {
                if(periodFilter==null){
                    return data.filter(d => d.getPlace()===placeFilter && d.getType()=== typeFilter)
                }else{
                    return data.filter(d => d.getPlace()===placeFilter && d.getType()=== typeFilter && periodFilter.contains(d.getTime()))
                }
            }
        }
    }

    return {
        getPlaceFilter,
        setPlaceFilter,
        clearPlaceFilter,
        getTypeFilter,
        setTypeFilter,
        clearTypeFilter,
        getPeriodFilter,
        setPeriodFilter,
        clearPeriodFilter,
        convertToUsUnits,
        convertToInternationalUnits,
        add,
        getFilteredData
    }
}