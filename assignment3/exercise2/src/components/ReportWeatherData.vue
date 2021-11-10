<template>
  <div>
    <h3>Report historical data</h3>

    <label>Choose type</label>
    <select v-model="selectedType">
      <option v-for="type in types" :key="type.id">{{ type }}</option>
    </select>

    <label>Choose place</label>
    <select v-model="selectedCity">
      <option v-for="place in cities" :key="place.id">{{ place }}</option>
    </select>

    <label>Date-Time</label>
    <date-pick
        v-model="selectedDateTime"
        :pickTime="true"
        :format="'YYYY-MM-DD HH:mm'"
    ></date-pick>

    <label>Value</label>
    <input type="number" v-model="value">

    <label>Unit</label>
    <select v-model="selectedUnit">
      <option v-for="unit in possibleUnits" :key="unit.id">{{ unit }}</option>
    </select>

    <div v-if="selectedType === 'precipitation'">
      <label>Precipitation type</label>
      <select v-model="selectedPrecipType">
        <option v-for="type in precipTypes" :key="type.id">{{ type }}</option>
      </select>
    </div>

    <div v-if="selectedType === 'wind speed'">
      <label>Wind Direction</label>
      <select v-model="selectedWindDirection">
        <option v-for="d in windDirections" :key="d.id">{{ d }}</option>
      </select>
    </div>

    <button v-on:click="onSendTheReport()">Send the report</button>

  </div>
</template>

<script>
import DatePick from 'vue-date-pick'; // TODO: npm install vue-date-pick
import 'vue-date-pick/dist/vueDatePick.css';
import {Service} from "@/store/service";

export default {
  name: "ReportWeatherData",
  props: {},
  components: {
    DatePick
  },
  data() {
    return {
      service: new Service(),

      types: ["temperature", "precipitation", "wind speed", "cloud coverage"],
      cities: ["Horsens", "Aarhus", "Copenhagen"],

      tempUnits: ["C", "F"],

      precipUnits: ["mm", "inches"],
      precipTypes: ["rain", "snow"],

      windUnits: ["m/s", "km/h"],
      windDirections: ["N", "S", "W", "E", "NE", "NW", "SE", "SW"],

      cloudUnits: ["%"],

      // SELECTED
      selectedType: "",
      selectedCity: "",
      selectedDateTime: "",
      value: "",
      selectedUnit: "",
      // optional
      selectedPrecipType: "",
      selectedWindDirection: ""
    }
  },
  computed: {
    possibleUnits() {
      let units
      switch (this.selectedType) {
        case "temperature":
          units = this.tempUnits
          break;
        case "precipitation":
          units = this.precipUnits
          break;
        case "wind speed":
          units = this.windUnits
          break;
        case "cloud coverage":
          units = this.cloudUnits
          break
      }
      return units
    }
  },
  methods: {
    onSendTheReport() {
      let baseObject = {
        type: this.selectedType,
        time: this.selectedDateTime,
        place: this.selectedCity,
        value: this.value,
        unit: this.selectedUnit
      }

      if(this.selectedType === "precipitation"){
        baseObject.precipitation_type = this.selectedPrecipType
      } else if(this.selectedType === "wind speed"){
        baseObject.direction = this.selectedWindDirection
      }

      this.service.sendHistoricalData(baseObject)
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>