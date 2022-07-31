import { useEffect, useState } from "react";
import axios from "axios";
import Mic from "./Mic";

const Meter = ({ setText, setWarning, warning }) => {
    const date = new Date();
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes();
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState({});
    const [air, setAir] = useState(0);
    const [color, setColor] = useState("");

    useEffect(() => {
        const airRating = {
            1: { text: "Good", color: "bg-emerald-500" },
            2: { text: "Satisfactory", color: "bg-blue-500" },
            3: {
                text: "Moderate",
                color: "bg-indigo-500",
            },
            4: { text: "Unhealthy", color: "bg-orange-500" },
            5: { text: "V. Unhealthy", color: "bg-rose-500" },
            6: { text: "V. Unhealthy", color: "bg-rose-500" },
        };

        const getLocation = async () => {
            const res = await axios.get("https://geolocation-db.com/json/");
            setLocation(`${res.data.city}, ${res.data.country_name}`);
        };
        const getWeather = async () => {
            const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Delhi&aqi=yes`
            );
            setWeather({
                temp: res.data.current.temp_c,
                word: res.data.current.condition.text,
            });

            const rating =
                airRating[
                    parseInt(res.data.current.air_quality["us-epa-index"])
                ];
            setAir(rating.text);
            setColor(rating.color);
        };

        getWeather();
        getLocation();
    }, []);

    return (
        <div className="info px-10 py-8 rounded-2xl flex absolute top-0 left-0 items-center scale-90">
            <div className="info-left flex flex-col border-r-black pr-8">
                <h1 className="font-semibold text-7xl pb-4">
                    {hour.toString().length === 1 ? `0${hour}` : hour}:
                    {minutes.toString().length === 1 ? `0${minutes}` : minutes}
                </h1>

                <div className="aqi flex flex-col items-center">
                    <div className="flex w-full h-full items-center justify-center">
                        <div
                            className={`aqi-indicator w-5 h-5 rounded-full mr-2 border-white border-2 ${color}`}
                        ></div>
                        <h3 className="text-2xl font-medium">{air}</h3>
                    </div>

                    <h4 className="aqi-tag text-sm">AQI</h4>
                </div>
            </div>

            <div className="info-right pl-8 flex flex-col justify-between">
                <div className="info-right-top flex w-full justify-between">
                    <div className="flex flex-col">
                        <h4 className="text-5xl font-light">
                            {weather && weather.temp}° C
                        </h4>
                        <h5 className="opacity-70 font-light">{location}</h5>
                    </div>

                    <Mic
                        setText={setText}
                        setWarning={setWarning}
                        warning={warning}
                    />
                </div>

                <h5 className="mt-4 text-lg w-56">
                    Forecast: {weather ? weather.word : ""}
                </h5>
            </div>
        </div>
    );
};

export default Meter;
