// features/weather/weatherSaga.ts
import { call, put, takeLatest, type CallEffect, type PutEffect } from "redux-saga/effects";
import { fetchWeather } from "../../services/weather.service";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../slices/weatherSlice";

function* handleFetchWeather(action: ReturnType<typeof fetchWeatherRequest>): Generator<CallEffect<any> | PutEffect<any> , void, any> {
  try {
    const { lat, lon } = action.payload;
    const data = yield call(fetchWeather, lat, lon);
    yield put(fetchWeatherSuccess(data));
  } catch (err: any) {
    yield put(fetchWeatherFailure(err.message));
  }
}

export function* weatherSaga() {
  yield takeLatest(fetchWeatherRequest.type, handleFetchWeather);
}
