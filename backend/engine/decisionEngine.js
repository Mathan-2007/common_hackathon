const { generateAIResponse } = require("../modules/ai/aiService");
const { geocodeLocation } = require("../modules/maps/geocode");
const { getRoute } = require("../modules/maps/routing");
const { extractLocationAndPlaceAI } = require("../modules/ai/aiService");
const { findNearbyPlace } = require("../modules/maps/places");

// 🔥 simple memory (per server run)
let lastUserContext = {};

async function handleQuery(query) {

    const { location, place } = await extractLocationAndPlaceAI(query);

    if (location && place) {

        console.log("Extracted:", location, place);

        const geo = await geocodeLocation(location);
        console.log("Geo:", geo);

        const places = await findNearbyPlace(place, geo.lat, geo.lon);
        console.log("Places:", places);

        if (!places.length) return "No places found 😅";

        const first = places[0];
        console.log("First place:", first);

        const directions = await getRoute(
            geo.lat,
            geo.lon,
            first.lat,
            first.lon
        );

        console.log("Directions:", directions);

        return `Route ready da 🚗:\n${directions.slice(0, 3).join("\n")}`;
    }

    return "Konjam clear ah sollu 😅";
}

module.exports = { handleQuery };