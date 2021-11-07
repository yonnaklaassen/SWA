<template>
  <div id="app">

    <label >Choose the City:</label>
    <select v-model="selectedCity" >
      <option v-for="place in cities" :key="place.id">{{place}}</option>
    </select>

    <label>Date From</label>
    <date-pick
        v-model="dateFrom"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <label>Date To</label>
    <date-pick
        v-model="dateTo"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <h3>{{selectedCity}}</h3>

    <WeatherByCity :city="selectedCity"/>

    <WeatherDetails :city="selectedCity" :dateFrom="dateFrom" :dateTo="dateTo" />

    <WeatherForecast :city="selectedCity"/>

    <ReportWeatherData/>
  </div>
</template>

<script>
import WeatherByCity from "@/components/WeatherByCity";
import DatePick from 'vue-date-pick'; // TODO: npm install vue-date-pick
import 'vue-date-pick/dist/vueDatePick.css';
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import ReportWeatherData from "@/components/ReportWeatherData";

export default {
  name:  "App",
  components: {
    ReportWeatherData,
    WeatherForecast,
    WeatherDetails,
    WeatherByCity,
    DatePick,

  },
  data() {
    return {
      cities: ["Horsens", "Aarhus", "Copenhagen"],
      selectedCity: "",
      dateFrom: 'date from',
      dateTo: 'date to'
    }
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
