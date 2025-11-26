import App from "../../App";
import WeatherWidget from "../weather/WeatherWidget";

export default function MainLayout() {
    return (
        <>
            <App />
            <div className="fixed bottom-4 right-4">
                <WeatherWidget />
            </div>
        </>
    )
}