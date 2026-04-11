const { getSpeechText } = require("../modules/voice/stt");
const { buildVoiceResponse, buildRetryResponse } = require("../modules/voice/tts");
const { handleQuery } = require("../engine/decisionEngine");
const { BASE_URL } = require("../config/config");

// 🔹 Handle incoming call
const handleCall = (req, res) => {
    const xml = buildVoiceResponse(BASE_URL, "Ask me anything");
    res.type("text/xml").send(xml);
};

// 🔹 Process speech
const processSpeech = async (req, res) => {
    const userQuery = getSpeechText(req);

    if (!userQuery) {
        const xml = buildRetryResponse(BASE_URL);
        return res.type("text/xml").send(xml);
    }

    console.log("User said:", userQuery);

    let aiResponse = "Okay 👍 I heard you"; // fallback

    try {
        aiResponse = await handleQuery(userQuery);
    } catch (error) {
        console.error("AI Error (ignored):", error.message);
        // keep fallback response
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Aditi" language="en-IN">${aiResponse}</Say>
    <Redirect>${BASE_URL}/call</Redirect>
</Response>`;

    res.type("text/xml").send(xml);
};
module.exports = { handleCall, processSpeech };