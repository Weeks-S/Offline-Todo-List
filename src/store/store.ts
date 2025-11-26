import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { uiReducer, weatherReducer } from ".";
import { weatherSaga } from "./sagas/weatherSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    weather: weatherReducer
  },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});
sagaMiddleware.run(weatherSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
