import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractInfo = async (text) => {
  if (!text) {
    return {
      projectName: null,
      budget: null,
      contractor: null,
      location: null,
    };
  }

  const prompt = `
You are an information extraction system.

Extract the following fields from the document text below:

- projectName
- budget (number only, no currency symbols)
- contractor
- location

Rules:
- If a field is not found, return null
- Do NOT guess or hallucinate
- Return STRICT JSON only, no explanation

Document Text:
"""
${text}
"""
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("LLM JSON parse error:", error);
    return {
      projectName: null,
      budget: null,
      contractor: null,
      location: null,
    };
  }
};
