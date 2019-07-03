import api from "../api";

class WeatherService {
  async getWeatherInParis() {
    try {
      const response = await api.get("/weather");
      if (response) {
        return response.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default new WeatherService();
