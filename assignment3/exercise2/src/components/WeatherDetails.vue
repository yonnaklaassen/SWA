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
  methods: {
    getMaxTemperature(){
      console.log(this.maxTemp)
      let promise = this.service.getMaxTemp(this.city, this.dateFrom, this.dateTo)
      promise.then(result => {
        this.maxTemp = result
      })
    }
  },
  watch:{
    dateTo: {
      handler() {
        this.getMaxTemperature()
      }
    }
  }

}
</script>

<style scoped>

</style>