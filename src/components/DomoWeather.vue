<template>
  <div class="domo-weather">
    <a href="#" @click.prevent="getWeatherInParis">
      <i class="glyph-icon flaticon-update-arrow"></i>
    </a>
    <span v-if="weather">
      <img src="@/assets/icons/sunrise.png" />
      {{ sunrise }}
      <img src="@/assets/icons/sunset.png" />
      {{ sunset }}
      <span class="temperature" v-if="temperature">{{ temperature }}°C</span>
    </span>
  </div>
</template>

<script>
import weatherService from "../services/WeatherService";

const toTime = date => {
  return new Date(date * 1000).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

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
        const sunrise = this.weather.sys.sunrise;
        return toTime(sunrise);
      }
      return null;
    },
    sunset() {
      if (this.weather) {
        const sunset = this.weather.sys.sunset;
        return toTime(sunset);
      }
      return null;
    },
    temperature() {
      if (this.weather) {
        const temperature = this.weather.main.temp;
        if (!temperature) {
          return null;
        }
        return temperature.toLocaleString();
      }
      return null;
    }
  }
};
</script>

<style>
img {
  vertical-align: bottom;
}
.temperature {
  margin: 0 15px;
}
</style>
