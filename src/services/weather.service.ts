import axios from "axios";

const API_URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeather(lat: number, lon: number) {
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: `${lat},${lon}`,
    },
  });
  return response.data;
}
