<template>
  <div>
    <p>{{measurements}}</p>
  </div>
</template>

<script>
import {Service} from "@/store/service";
export default {
  name: "WeatherByCity",
  props: ['city'],
  data() {
    return {
      service: new Service(),
      measurements: "",
    }
  },
  methods: {
    getLastMeasurements(){
      this.measurements = this.service.getLastMeasurements(this.city)
    },
  },
  watch: {
    city:{
      handler(){
        this.getLastMeasurements()
      }
    }
  }
}
</script>

<style scoped>

</style>