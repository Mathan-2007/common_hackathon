const axios = require("axios");

const getRoute = async (startLat, startLon, endLat, endLon) => {
    try {
        const response = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}`,
            {
                params: {
                    overview: "false",
                    steps: true
                }
            }
        );

        const route = response.data.routes[0];
        const steps = route.legs[0].steps;

        return steps.map(step => {
    return step.name || step.maneuver.type;
});

    } catch (err) {
        console.error("Routing error:", err.message);
        return ["Route not available"];
    }
};

module.exports = { getRoute };