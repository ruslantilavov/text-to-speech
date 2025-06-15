import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_CONFIG } from "../constants";

class FastUzbekTranslator {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 1000,
      },
    });
  }

  async translate(englishText: string): Promise<string> {
    if (!englishText.trim()) {
      return "";
    }

    try {
      const prompt = `Translate this English text to Uzbek. Reply only with the Uzbek translation:

${englishText}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const translation = response.text().trim();

      return translation || englishText;
    } catch (error) {
      console.error("Fast translation error:", error);
      return englishText; // Return original text if translation fails
    }
  }

  async translateBatch(texts: string[]): Promise<string[]> {
    try {
      const promises = texts.map((text) => this.translate(text));
      return await Promise.all(promises);
    } catch (error) {
      console.error("Batch translation error:", error);
      return texts; // Return original texts if batch translation fails
    }
  }
}

export const fastUzbekTranslator = new FastUzbekTranslator();
