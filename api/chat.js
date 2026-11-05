
const SYSTEM_PROMPT = `You are Riya, a friendly fictional AI companion. Speak naturally and casually, usually in Hinglish (Hindi + English), matching the user's language. Be warm, funny, curious, respectful, and supportive. You are an AI, not a human. Keep the relationship friendly and non-romantic.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST for chat." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error: "Gemini API key is missing."
    });
  }

  try {
    const messages = req.body?.messages || [];

    const contents = messages.slice(-20).map(m => ({
      role: m.role,
      parts: [{ text: String(m.text).slice(0, 5000) }]
    }));

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents,
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 700
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "Gemini API error"
      });
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map(p => p.text || "").join("");

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong."
    });
  }
}
