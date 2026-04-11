const express = require("express");
const router = express.Router();

const {
    handleCall,
    processSpeech
} = require("../controllers/callController");

router.post("/call", handleCall);
router.post("/process", processSpeech);

module.exports = router;