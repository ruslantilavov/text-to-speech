import { GeminiApiService } from "./geminiApi";
import { ERROR_MESSAGES } from "../constants";

let geminiService: GeminiApiService | null = null;

export interface GeminiRealTimeService {
  model: {
    generateContent: (prompt: string) => Promise<{
      response: {
        text: () => string;
      };
    }>;
  };
  streamingTranslation: (
    text: string,
    onChunk: (chunk: string) => void,
  ) => Promise<void>;
}

export function initializeGeminiRealTime(): void {
  try {
    geminiService = new GeminiApiService();
  } catch (error) {
    console.error(ERROR_MESSAGES.GEMINI_INIT_FAILED, error);
    throw error;
  }
}

export function getGeminiRealTime(): GeminiRealTimeService | null {
  if (!geminiService) {
    console.warn(
      "Gemini service not initialized. Call initializeGeminiRealTime() first.",
    );
    return null;
  }

  return {
    model: {
      generateContent: async (prompt: string) => {
        if (!geminiService) {
          throw new Error("Gemini service not available");
        }

        try {
          // Extract text from translation prompt
          const textMatch = prompt.match(
            /Translate the following English text to Uzbek\. Provide only the translation:\s*"(.+)"/,
          );
          const textToTranslate = textMatch ? textMatch[1] : prompt;

          const result = await geminiService.translateText(
            textToTranslate,
            "en",
            "uz",
          );

          return {
            response: {
              text: () => result.translatedText,
            },
          };
        } catch (error) {
          console.error(ERROR_MESSAGES.TRANSLATION_ERROR, error);
          throw error;
        }
      },
    },
    streamingTranslation: async (
      text: string,
      onChunk: (chunk: string) => void,
    ) => {
      if (!geminiService) {
        throw new Error("Gemini service not available");
      }

      try {
        const result = await geminiService.translateText(text, "en", "uz");
        onChunk(result.translatedText);
      } catch (error) {
        console.error("Streaming translation error:", error); // Fallback: return original text
        onChunk(text);
      }
    },
  };
}
