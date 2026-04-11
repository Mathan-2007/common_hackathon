const twilio = require("twilio");

const client = twilio("AC439cbb00ea5e0d839063dbea6dc27424", "c30ac38456487da621006a31075d2e47");

client.calls.create({
    url: "https://audrina-plumbless-overdrily.ngrok-free.dev/call",
    to: "+916380736070",        // your phone number
    from: "+17405357873"        // your Twilio number
})
.then(call => console.log("Call SID:", call.sid))
.catch(err => console.error(err));