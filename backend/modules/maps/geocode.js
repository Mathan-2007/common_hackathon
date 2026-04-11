const axios = require("axios");

const geocodeLocation = async (location) => {
    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: location,
                    format: "json",
                    limit: 1
                },
                headers: {
                    "User-Agent": "your-app"
                }
            }
        );

        if (!response.data.length) return null;

        const place = response.data[0];

        return {
            lat: place.lat,
            lon: place.lon,
            display: place.display_name
        };

    } catch (err) {
        console.error("Geocode error:", err.message);
        return null;
    }
};

module.exports = { geocodeLocation };