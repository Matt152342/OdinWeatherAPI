import "./style.css";
import { api } from "./server.js";

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
            precipation: data.currentConditions.precip,
            humidity: data.currentConditions.humidity,
            temperature: data.currentConditions.temp,
            uvIndex: data.currentConditions.uvindex,
        };

        return processed;
    } catch (error) {
        console.error(error.message);
    }
}

const form = document.querySelector('form');
const locationInput = document.querySelector('location');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('location').value;

    api.location = location;
    processData().then((response) => {
        console.log(response);
    })
});