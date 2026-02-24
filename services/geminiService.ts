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
