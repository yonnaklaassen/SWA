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
      measurements: "",
    }
  },
  methods: {
    getLastMeasurements(){
      const service = new Service()
      this.measurements = service.getLastMeasurements(this.city)
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