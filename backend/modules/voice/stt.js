const getSpeechText = (req) => {
    return req.body.SpeechResult?.trim() || null;
};

module.exports = { getSpeechText };