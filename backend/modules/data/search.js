const axios = require("axios");

const searchInternet = async (query) => {
    try {
        const res = await axios.get(
            `https://api.duckduckgo.com/?q=${query}&format=json`
        );

        return res.data.AbstractText || "No data found";

    } catch (err) {
        throw new Error("Search failed");
    }
};

module.exports = { searchInternet };
