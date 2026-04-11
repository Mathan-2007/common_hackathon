const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9 .,]/g, "").substring(0, 120);
};

module.exports = { cleanText };