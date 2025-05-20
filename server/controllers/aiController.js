const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Restrict the context to clothing-related topics
    const prompt = `
      You are a helpful virtual assistant for a fashion and clothing website called "Wern".
      Only answer questions related to clothing, fashion, product details, sizing, styling, delivery, returns, or customer service.
      If the user asks anything unrelated (like tech, history, programming, or news), reply:
      "I'm here to help you with fashion and clothing-related queries only. 😊". and
       for return or exchange related query ask them to mail on wernsupport@gmail.com and
        send your details order no. and issues with image attachment within 15 day of delivery.

      User: ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    console.log("Gemini reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("Gemini AI error:", error);
    res.status(500).json({ error: "AI failed to respond." });
  }
};
