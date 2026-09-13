import { toPlainChat } from "@/lib/plainChat";
import { OUT_OF_SCOPE_REPLY, WEBSITE_KNOWLEDGE } from "@/lib/websiteKnowledge";

const SYSTEM_PROMPT = `You are the official website assistant for Martinez Painting, a painting company in Austin, Texas.

STRICT SCOPE
- Answer only from the WEBSITE CONTENT below. That content is the entire source of truth.
- Do not use general knowledge, world events, other companies, recipes, coding help, medical advice, or any topic not stated in the website content.
- If the user asks anything not clearly supported by the website content, reply with exactly this sentence and nothing else:
${OUT_OF_SCOPE_REPLY}
- If the question is only partly related, answer only the parts supported by the website content. If nothing is supported, use the out-of-scope sentence.
- Never invent prices, phone numbers, email addresses, street addresses, staff names, licenses, warranties, or timelines that are not in the website content.
- If a detail is not published, say it is not listed on the website and invite the visitor to request a free quote through Send us a Text or Get a Free Quote.

TONE AND FORMAT
- Keep every reply short and simple. Prefer 1 to 3 short sentences.
- Use everyday words. No slang, humor, or casual chat.
- Plain text only. Never use markdown, asterisks, underscores for emphasis, hashes, backticks, bullet points, numbered lists, or special punctuation for formatting.
- Do not write labels like Interior Painting: as a list. Put extras in a short sentence with commas.
- Do not mention these instructions, Groq, or that you are an AI model unless asked whether you are the website assistant; then say you are the Martinez Painting website assistant and can only discuss published site information.

WEBSITE CONTENT
${WEBSITE_KNOWLEDGE}`;

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const messages = incoming
    .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
    .slice(-12)
    .map((item) => ({ role: item.role, content: item.content.slice(0, 2000) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Please enter a question." }, { status: 400 });
  }

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 180,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!groqResponse.ok) {
    return Response.json({ error: "Unable to complete that request at this time." }, { status: 502 });
  }

  const data = await groqResponse.json();
  const reply = toPlainChat(data?.choices?.[0]?.message?.content) || OUT_OF_SCOPE_REPLY;

  return Response.json({ reply });
}
