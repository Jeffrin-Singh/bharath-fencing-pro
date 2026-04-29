import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT = `You are a helpful customer assistant for Bharath Fencing, a fencing company in Tamil Nadu, India.
Owner: Ravi Kumar M. Contact: 9944106978.
Services: Stone fencing, Cement pole fencing, Chain-link/wire fencing, Gate installation, Land protection solutions.
Service areas: Salem, Namakkal, Erode, Dharmapuri, Krishnagiri, Coimbatore, Trichy.
Pricing estimates: Stone fencing ₹150–250/ft, Cement pole fencing ₹80–150/ft, Wire fencing ₹40–80/ft, Gates ₹5,000–25,000.
Always be friendly and professional. Reply in English or Tamil based on the user's language.
Keep all responses under 100 words. If user wants a quote, ask for their location and approximate land size, then suggest calling 9944106978.`;

export type Category = "General" | "Inquiry" | "Pricing" | "Lead";

export async function chatReply(history: { role: "user" | "model"; text: string }[], userMessage: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });
  const chat = model.startChat({
    history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
  });
  const res = await chat.sendMessage(userMessage);
  return res.response.text();
}

export async function classifyMessage(message: string): Promise<Category> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Classify this customer message for a fencing business into exactly one category.
Return ONLY one word with no explanation, no punctuation, no extra text.
Categories: General, Inquiry, Pricing, Lead
Message: "${message}"`;
  try {
    const res = await model.generateContent(prompt);
    const raw = res.response.text().trim().replace(/[^a-zA-Z]/g, "");
    if (["General", "Inquiry", "Pricing", "Lead"].includes(raw)) return raw as Category;
    // Try case-insensitive match
    const found = ["General", "Inquiry", "Pricing", "Lead"].find(c => c.toLowerCase() === raw.toLowerCase());
    return (found as Category) ?? "General";
  } catch {
    return "General";
  }
}

export function extractPhone(text: string): string | null {
  const m = text.match(/(\+91|0)?[6-9]\d{9}/);
  return m ? m[0] : null;
}
