import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const date = new Date();
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes();
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(0);
    const [air, setAir] = useState(0);

    useEffect(() => {
        const airRating = {
            1: "Good",
            2: "Moderate",
            3: "Unhealthy for sensitive group",
            4: "Unhealthy",
            5: "Very Unhealthy",
            6: "Very Unhealthy",
            7: "Very Unhealthy",
            8: "Very Unhealthy",
        };

        const getLocation = async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            setLocation(`${res.data.city}, ${res.data.country_name}`);
        };
        const getWeather = async () => {
            const res = await axios.get(
                `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Delhi&aqi=yes`
            );
            console.log(res.data);
            setWeather(res.data.current.temp_c);
            setAir(
                airRating[
                    parseInt(res.data.current.air_quality["us-epa-index"])
                ]
            );
        };

        getWeather();
        getLocation();
    }, []);

    return (
        <div className="hud">
            <h1>
                Time: {hour}:{minutes}
                <br />
                Location: {location}
                <br />
                Weather: {weather} C
                <br />
                Air Quality: {air}
            </h1>

            <div className="card px-10 py-6 rounded-xl bg-white "></div>
        </div>
    );
};

export default App;
