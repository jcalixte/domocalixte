<template>
  <div class="domo-weather">
    <a href="#" @click.prevent="getWeatherInParis">
      <i class="glyph-icon flaticon-update-arrow"></i>
    </a>
    <span v-if="weather">
      <i class="glyph-icon flaticon-nature"></i>
      {{ sunrise }}
      <i class="glyph-icon flaticon-dawn"></i>
      {{ sunset }}
    </span>
  </div>
</template>

<script>
import weatherService from "../services/WeatherService";

export default {
  name: "domo-weather",
  data() {
    return {
      weather: null
    };
  },
  async mounted() {
    this.getWeatherInParis();
  },
  methods: {
    async getWeatherInParis() {
      this.weather = await weatherService.getWeatherInParis();
    }
  },
  computed: {
    sunrise() {
      if (this.weather) {
        return new Date(this.weather.sys.sunrise * 1000).toLocaleTimeString(
          "fr-FR",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        );
      }
      return null;
    },
    sunset() {
      if (this.weather) {
        return new Date(this.weather.sys.sunset * 1000).toLocaleTimeString(
          "fr-FR",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        );
      }
      return null;
    }
  }
};
</script>
