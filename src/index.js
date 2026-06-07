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
    const conditionsHeader = document.createElement('div');
    const tempInfo = document.createElement('div');
    const conditionsInfo = document.createElement('div');

    const precipDiv = document.createElement('div');
    const precipHeader = document.createElement('div');
    const precipInfo = document.createElement('div');

    const humidDiv = document.createElement('div');
    const humidHeader = document.createElement('div');
    const humidInfo = document.createElement('div');

    const uvDiv = document.createElement('div');
    const uvHeader = document.createElement('div');
    const uvInfo = document.createElement('div');

    conditionsHeader.textContent = "Conditions";
    tempInfo.textContent = `${temperature} \xB0C`;
    conditionsInfo.textContent = conditions;

    precipHeader.textContent = "Precipitation";
    precipInfo.textContent = precipitation;

    humidHeader.textContent = "Humidity";
    humidInfo.textContent = humidity;

    uvHeader.textContent = "UV Index";
    uvInfo.textContent = uvIndex;

    conditionsHeader.classList.add('conditionsHeader');
    precipHeader.classList.add('header');
    humidHeader.classList.add('header');
    uvHeader.classList.add('header');

    tempInfo.classList.add('tempInfo');
    conditionsInfo.classList.add('info');
    precipInfo.classList.add('info');
    humidInfo.classList.add('info');
    uvInfo.classList.add('info');

    conditionsDiv.appendChild(conditionsHeader);
    conditionsDiv.appendChild(conditionsHeader);
    conditionsDiv.appendChild(tempInfo);
    conditionsDiv.appendChild(conditionsInfo);

    precipDiv.appendChild(precipHeader);
    precipDiv.appendChild(precipInfo);

    humidDiv.appendChild(humidHeader);
    humidDiv.appendChild(humidInfo);

    uvDiv.appendChild(uvHeader);
    uvDiv.appendChild(uvInfo);

    primaryGrid.appendChild(conditionsDiv);

    secondaryGrid.appendChild(precipDiv);
    secondaryGrid.appendChild(humidDiv);
    secondaryGrid.appendChild(uvDiv);

    primaryGrid.classList.add('primaryGrid');
    secondaryGrid.classList.add('secondaryGrid');

    display.appendChild(primaryGrid);
    display.appendChild(secondaryGrid);
}

const form = document.querySelector('#locationForm');
const locationInput = document.querySelector('location');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('location').value;

    display.innerHTML = '<div class="loading">Loading weather data...</div>';

    api.location = location;
    processData().then((response) => {
        display.innerHTML = '';
        displayInfo(response.conditions, response.precipation, response.humidity, response.temperature, response.uvIndex);
    })
});
