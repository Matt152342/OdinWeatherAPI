const api = {
    location: "",
    metric: "",
    key: "HYQHE67AXHWUKUPUWBNAAXQBN",

    get finalURL() {
        return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.town}?unitGroup=${this.metric}&key=${this.key}`;
    }
}

export { api };