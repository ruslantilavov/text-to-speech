import { geminiApi } from "./geminiApi";

export type TranslationMode = "gemini";

export interface EnhancedTranslationResult {
  translatedText: string;
  confidence: number;
  mode: TranslationMode;
  alternatives?: string[];
  detectedLanguage?: string;
  isOffline: boolean;
}

export async function translateTextEnhanced(
  englishText: string
): Promise<EnhancedTranslationResult> {
  const text = englishText.toLowerCase().trim();

  try {
    const isApiAvailable = await geminiApi.checkApiHealth();
    if (!isApiAvailable) {
      throw new Error("Gemini API is not available");
    }

    return await translateWithGemini(text);
  } catch (error) {
    console.error("Translation failed:", error);
    throw new Error(
      `Translation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

async function translateWithGemini(
  text: string
): Promise<EnhancedTranslationResult> {
  try {
    const result = await geminiApi.translateText(text, "en");

    return {
      translatedText: result.translatedText,
      confidence: result.confidence,
      mode: "gemini",
      alternatives: result.alternativeTranslations,
      detectedLanguage: result.detectedLanguage,
      isOffline: false,
    };
  } catch (error) {
    throw new Error(
      `Gemini translation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function batchTranslateEnhanced(
  texts: string[]
): Promise<EnhancedTranslationResult[]> {
  const promises = texts.map((text) => translateTextEnhanced(text));
  return Promise.all(promises);
}
