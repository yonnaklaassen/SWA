<template>
  <div>
    <h3>Forecast</h3>

    <label>Date From</label>
    <date-pick
        v-model="dateFromForecast"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <label>Date To</label>
    <date-pick
        v-model="dateToForecast"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <p>{{forecast}}</p>
  </div>
</template>

<script>
import {Service} from "@/store/service";
import DatePick from 'vue-date-pick'; // TODO: npm install vue-date-pick
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: "WeatherForecast",
  props: ['city'],
  components: {
    DatePick
  },
  data() {
    return {
      service: new Service(),
      dateFromForecast: "date from",
      dateToForecast: "date to",
      forecast: "",
    }
  },
  computed: {
    dateChange(){
      return [this.dateFromForecast, this.dateToForecast, this.city]
    }
  },
  methods: {
    getForecast(){
      this.service.getForecast(this.city, this.dateFromForecast, this.dateToForecast).then(r => this.forecast = r)
    }
  },
  watch: {
    dateChange: {
      handler(){
        this.getForecast()
      }
    }
  }
}
</script>

<style scoped>

</style>