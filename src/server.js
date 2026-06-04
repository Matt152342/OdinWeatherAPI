const api = {
    town: "",
    country: "",
    metric: "",
    key: "HYQHE67AXHWUKUPUWBNAAXQBN",

    get finalURL() {
        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.town}%20${this.country}?unitGroup=${this.metric}&key=${this.key}`;
    }
}

export { api };