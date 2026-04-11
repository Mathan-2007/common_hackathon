const axios = require("axios");

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const findNearbyPlace = async (place, userLat, userLon) => {
    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: place,
                    format: "json",
                    limit: 5
                },
                headers: {
                    "User-Agent": "your-app"
                }
            }
        );

        let results = response.data.map(r => {
            const distance = calculateDistance(
                userLat,
                userLon,
                parseFloat(r.lat),
                parseFloat(r.lon)
            );

            return {
                name: r.display_name,
                lat: parseFloat(r.lat),
                lon: parseFloat(r.lon),
                distance
            };
        });

        // 🔥 FILTER ONLY NEARBY (IMPORTANT)
        results = results.filter(r => r.distance < 20); // 20 km radius

        // 🔥 SORT NEAREST
        results.sort((a, b) => a.distance - b.distance);

        if (!results.length) return [];

        // 🔥 RETURN STRUCTURED DATA
        return results.map(r => ({
            name: r.display_name,
            lat: parseFloat(r.lat),
            lon: parseFloat(r.lon)
        }));

    } catch (err) {
        console.error("Places error:", err.message);
        return [];
    }
};

module.exports = { findNearbyPlace }