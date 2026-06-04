import "./style.css";
import { api } from "./server.js";

api.town = "George";
api.country = "South Africa";
api.metric = "metric";

const rawData = async () => {
    try {
        const response = await fetch(api.finalURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

const processData = async () => {
    try {
        const data = await rawData();

        const processed = {
            conditions: data.currentConditions.conditions,
            time: data.currentConditions.datetime,
            humidity: data.currentConditions.humidity,
            temperature: data.currentConditions.temp,
        };

        return processed;
    } catch (error) {
        console.error(error.message);
    }
}

processData().then((response) => {
    console.log(response.conditions);
});