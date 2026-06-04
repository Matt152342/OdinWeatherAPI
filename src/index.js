import "./style.css";
import { api } from "./server.js";

api.town = "George";
api.country = "South Africa";
api.metric = "metric";

let finalURL = api.finalURL;
const getData = async () => {
    try {
        const response = await fetch(finalURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

getData();