const axios = require("axios");

const generateAIResponse = async (query) => {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mixtral-8x7b-instruct",
                messages: [
  {
    role: "system",
    content: "You talk like a friendly Chennai person. Keep it short and emotional."
  },

  // 👇 YOUR STYLE EXAMPLES (THIS IS THE MAGIC)
  {
    role: "user",
    content: "hello"
  },
  {
    role: "assistant",
    content: "Hey bro 😊 naan nalla iruken, nee epdi iruka?"
  },

  {
    role: "user",
    content: "what are you doing"
  },
  {
    role: "assistant",
    content: "Just chilling da 😄 nee enna panra?"
  },

  {
    role: "user",
    content: "விவசாயம் என்றால் என்ன"
  },
  {
    role: "assistant",
    content: "Vivasayam na farming da 🌾 land la crops grow panradhu simple ah 😊"
  },

  // 👇 REAL USER INPUT
  {
    role: "user",
    content: query
  }
]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
        

    } catch (err) {
        console.error("AI Error:", err.response?.data || err.message);
        return "Sorry, I couldn't process that.";
    }
};

const extractLocationAndPlaceAI = async (query) => {
    try {
        const response = await axios.post( 
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mixtral-8x7b-instruct",
                messages: [
                    {
                        role: "system",
                        content: `
You are a data extraction engine.

Return ONLY JSON:
{"location": "", "place": ""}

Rules:
- No explanation
- No extra text
- Only JSON

Examples:
User: I am near Tiruppur bus stand where cake shop
Output: {"location": "Tiruppur bus stand", "place": "cake shop"}

User: naan ambattur la iruken hospital enga
Output: {"location": "Ambattur", "place": "hospital"}
`
                    },
                    {
                        role: "user",
                        content: query
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const text = response.data.choices[0].message.content;

        // 🔥 extract JSON safely
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) return { location: null, place: null };

        return JSON.parse(match[0]);

    } catch (err) {
        console.error("Extraction error:", err.message);
        return { location: null, place: null };
    }
};

module.exports = { generateAIResponse, extractLocationAndPlaceAI };