
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function getTeamMembers() {
  return ["Priya", "Sarah", "James", "Wei", "Ahmed", "Lena"];
}


const parse = async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    const team = await getTeamMembers();
    const today = new Date().toISOString().split("T")[0];
    const systemPrompt = `You extract task fields from short natural-language input for a project management app.

Today's date is ${today}.
Known team members: ${team.join(", ")}.

Rules:
- Resolve relative dates ("tomorrow", "next friday", "in 3 days") into YYYY-MM-DD using today's date.
- Match assignee names against the known team members list (fuzzy match casing/typos). If no confident match, return the name as typed. If no assignee is mentioned, use null.
- priority must be one of "High", "Medium", "Low", or null if not mentioned.
- description should be the description about the task in at least 50 letters and not more than 100.
- title should be the task itself with assignee/date/priority/tag phrases removed, capitalized naturally and should not be more than 30 characters.

Return ONLY valid JSON, no markdown fences, no explanation, matching exactly:
{"title": string, "assignee": string|null, "date": string|null, "priority": string|null, "description":string`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_tokens: 800,
      temperature: 0.2,
      reasoning_format: "hidden",
      reasoning_effort: "low",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    const raw = response.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.log(e)
      console.error("Failed to parse model output as JSON:", cleaned);
      return res.status(502).json({ error: "Could not parse model response" });
    }

    return res.json({ parsed, rawInput: text });
  } catch (err) {
    console.error("Groq API error:", err);
    return res.status(500).json({ error: "Failed to parse task" });
  }
}
module.exports = parse;