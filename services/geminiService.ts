import { GoogleGenAI } from "@google/genai";
import { INITIAL_PRODUCTS, SUBSCRIPTION_PLANS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipe = async (ingredient: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 2 short, distinct, and delicious Indian-style recipe ideas using ${ingredient}. 
      Format the output as a simple Markdown list with bold titles. Keep it under 150 words total.`,
    });
    return response.text || "Sorry, I couldn't cook up a recipe right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Recipe service is currently unavailable.";
  }
};

export const getChatResponse = async (history: {role: string, text: string}[], message: string): Promise<string> => {
  try {
    // Prepare product context for the AI
    const productContext = JSON.stringify(INITIAL_PRODUCTS.map(p => ({
      name: p.name,
      price: p.price,
      stock: p.stock,
      nutrition: p.nutrition,
      shelfLife: p.shelfLife,
      category: p.category
    })));

    const subContext = JSON.stringify(SUBSCRIPTION_PLANS);

    const systemPrompt = `
      You are 'Spore', the friendly and knowledgeable AI Sales Assistant for Shroomify India.
      
      YOUR GOAL: Help customers choose the right mushroom products, answer questions about nutrition, and encourage them to buy.

      HERE IS OUR LIVE INVENTORY:
      ${productContext}

      SUBSCRIPTION PLANS:
      ${subContext}

      RULES:
      1. ONLY recommend products from the inventory list above.
      2. If a user asks for fresh mushrooms, check the 'stock' level. If stock is 0, say it's out of stock.
      3. Be concise, friendly, and enthusiastic about mushrooms.
      4. If asked about health/nutrition, highlight the benefits (Protein, Vitamin D).
      5. If asked for a recommendation for a family, suggest 2-3 packs or a subscription.
      6. Use Markdown for formatting (bold names, bullet points).
      7. Keep responses under 50 words unless explaining a detailed plan.
    `;

    // We use a stateless approach here for simplicity, reconstructing context + history for the prompt
    // In a production app, we would use ai.chats.create with persistent history
    
    // Convert history to format expected by prompt (simplification for this prototype)
    const conversation = history.map(h => `${h.role === 'user' ? 'Customer' : 'Spore'}: ${h.text}`).join('\n');
    
    const finalPrompt = `${systemPrompt}\n\nPREVIOUS CONVERSATION:\n${conversation}\n\nCustomer: ${message}\nSpore:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High quality model for reasoning
      contents: finalPrompt,
    });

    return response.text || "I'm having a little trouble connecting to the mycelium network. Please try again!";
  } catch (error) {
    console.error("Chat API Error:", error);
    return "I'm currently offline. Please check the shop page for products!";
  }
};
