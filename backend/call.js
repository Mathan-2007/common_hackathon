require('dotenv').config(); // Essential to read your .env file
const twilio = require("twilio");

// Reference the keys from your .env file
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.calls.create({
    url: "https://audrina-plumbless-overdrily.ngrok-free.dev/call",
    to: "+916380736070", 
    from: process.env.TWILIO_PHONE_NUMBER 
})
.then(call => console.log("Call SID:", call.sid))
.catch(err => {
    console.error("Error making call:", err.message);
    if (err.code === 20003) console.error("Check if your .env variables are loaded correctly!");
});
