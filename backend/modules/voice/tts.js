const buildVoiceResponse = (BASE_URL, message) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" language="ta-IN" action="${BASE_URL}/process" method="POST" speechTimeout="auto">
        <Say voice="Polly.Joanna" language="en-IN">${message}</Say>
    </Gather>
    <Say>I did not hear anything. Please try again.</Say>
    <Redirect>${BASE_URL}/call</Redirect>
</Response>`;
};

const buildRetryResponse = (BASE_URL) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>I didn't hear anything. Please try again.</Say>
    <Redirect>${BASE_URL}/call</Redirect>
</Response>`;
};

module.exports = { buildVoiceResponse, buildRetryResponse };