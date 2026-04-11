const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const callRoutes = require("./routes/callRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", callRoutes);

app.listen(8080, () => {
    console.log("🚀 Server running on port 8080");
});