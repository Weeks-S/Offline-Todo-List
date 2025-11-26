import { useEffect, useState } from "react";
import { fetchWeatherRequest } from "../../store/slices/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../loading/Loading";
import { Error } from "../error/Error";

export default function WeatherWidget() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const [lon, setLon] = useState(106.8456);
  const [lat, setLat] = useState(-6.2088);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLon(pos.coords.longitude);
        setLat(pos.coords.latitude);
      },
      () => {
        setLat(-6.2088);
        setLon(106.8456);
      }
    );
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      dispatch(fetchWeatherRequest({ lat, lon }));
    }
  }, [dispatch, lat, lon]);

  return (
    <div className="border p-4 rounded bg-blue-50">
      {loading && <Loading loadingText="Loading Weather..." />}
      {error ? (
        <Error message={error} />
      ) : data ? (
        <>
          <h2 className="text-lg font-bold">Weather</h2>
          <hr />
          <div className="flex">
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="bg-white rounded-full"
            />
            <div className="text-sm font-semibold">
              <p>
                Location:{" "}
                <span className="font-normal">{data.location.name}</span>
              </p>
              <p>
                Temp:{" "}
                <span
                  className={`${
                    data.current.temp_c <= 30 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {data.current.temp_c}°C
                </span>
              </p>
              <p>
                Condition:{" "}
                <span className="font-normal">
                  {data.current.condition.text}
                </span>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
