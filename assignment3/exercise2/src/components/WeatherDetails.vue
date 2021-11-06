<template>
  <div>
    <label>Minimum Temperature</label>
    <p>{{minTemp}}</p>
    <label>Max Temperature</label>
    <p>{{maxTemp}}</p>
    <label>Total Precipitation</label>
    <p>{{totalPrecip}}</p>
    <label>Average Wind Speed</label>
    <p>{{avrWind}}</p>
  </div>
</template>

<script>
import {Service} from "@/store/service";

export default {
  name: "WeatherDetails",
  props: ['city', 'dateFrom', 'dateTo'],
  data() {
    return {
      service: new Service(),
      minTemp: "",
      maxTemp: "",
      totalPrecip: "",
      avrWind: ""
    }
  },
  computed:{
    dateChange(){
      return [this.dateFrom, this.dateTo, this.city]
    }
  },
  methods: {
    getMinTemperature(){
      this.service.getMinTemp(this.city, this.dateFrom, this.dateTo).then(result => this.minTemp = result)
    },
    getMaxTemperature(){
      this.service.getMaxTemp(this.city, this.dateFrom, this.dateTo).then(result => this.maxTemp = result)
    },
    getTotalPrecipitation(){
      this.service.getTotal(this.city, this.dateFrom, this.dateTo).then(r => this.totalPrecip = r)
    },
    getAverageWind(){
      this.service.getAverageWindSpeed(this.city, this.dateFrom, this.dateTo).then(r => this.avrWind = r)
    }

  },
  watch:{
    dateChange: {
      handler() {
        this.getMaxTemperature()
        this.getMinTemperature()
        this.getTotalPrecipitation()
        this.getAverageWind()
      }
    }
  }

}
</script>

<style scoped>

</style>