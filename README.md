# Weather API Web App
A minimalist, responsive weather application that fetches and displays real-time weather data for any location globally using the Visual Crossing Weather API.

### Features
Global Search: Enter any city or location to retrieve up-to-date weather statistics.

Key Weather Metrics: Displays current conditions, temperature (in Celsius), precipitation, humidity, and UV index.

Responsive Layout: Adapts smoothly from desktop monitors down to mobile screens using CSS Grid and media queries.

Asynchronous Data Handling: Includes a built-in loading state while fetching API data.

### Tech Stack
Frontend: HTML5, Semantic CSS3 (CSS Variables, Flexbox, Grid)

JavaScript: Modern ES6+ JavaScript (Async/Await, Fetch API, Modules)

API: Visual Crossing Weather Timeline API

### Project Architecture
index.html: The structural skeleton containing the search form and the weather data display container.

server.js: Handles configuration for the API, including the query parameters (metric system) and dynamic URL construction.

index.js: The central engine of the application. It manages form submissions, makes the asynchronous network requests, processes the JSON response, and dynamically updates the DOM with new elements.

style.css: Contains custom styling, thematic color variables, and responsive layout breakpoints.
