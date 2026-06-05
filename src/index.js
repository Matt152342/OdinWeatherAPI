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

const display = document.querySelector('.display');
const displayInfo = (conditions, precipitation, humidity, temperature, uvIndex) => {
    const primaryGrid = document.createElement('div');
    const secondaryGrid = document.createElement('div');

    const conditionsDiv = document.createElement('div');
    const precipDiv = document.createElement('div');
    const humidDiv = document.createElement('div');
    const tempDiv = document.createElement('div');
    const uvDiv = document.createElement('div');

    primaryGrid.classList.add('primary');
    secondaryGrid.classList.add('secondary');

    conditionsDiv.classList.add('conditions');
    precipDiv.classList.add('precipitation');
    humidDiv.classList.add('humidity');
    tempDiv.classList.add('temperature');
    uvDiv.classList.add('uvIndex');

    conditionsDiv.textContent = conditions;
    precipDiv.textContent = precipitation;
    humidDiv.textContent = humidity;
    tempDiv.textContent = temperature;
    uvDiv.textContent = uvIndex;

    primaryGrid.appendChild(conditionsDiv);
    primaryGrid.appendChild(tempDiv);

    secondaryGrid.appendChild(precipDiv);
    secondaryGrid.appendChild(humidDiv);
    secondaryGrid.appendChild(uvDiv);

    display.appendChild(primaryGrid);
    display.appendChild(secondaryGrid);
}

const form = document.querySelector('#locationForm');
const locationInput = document.querySelector('location');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('location').value;

    api.location = location;
    processData().then((response) => {
        displayInfo(response.conditions, response.precipation, response.humidity, response.temperature, response.uvIndex);
    })
});
