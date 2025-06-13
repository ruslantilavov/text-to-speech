import { useCallback, useRef } from "react";
import { getGeminiRealTime } from "../utils/geminiLiveApi";

export interface UseTranslationReturn {
  translateText: (text: string, isFinal?: boolean) => Promise<string>;
  cancelPendingTranslation: () => void;
}

export const useTranslation = (): UseTranslationReturn => {
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const translateText = useCallback(
    async (text: string, isFinal: boolean = false): Promise<string> => {
      const geminiRealTime = getGeminiRealTime();
      if (!geminiRealTime) {
        return text;
      }

      try {
        if (isFinal) {
          // For final results, get the complete translation
          const translationPrompt = `Translate the following English text to Uzbek. Provide only the translation:

"${text}"`;

          const result = await geminiRealTime.model.generateContent(
            translationPrompt,
          );
          const response = await result.response;
          return response.text().trim();
        } else {
          // For interim results, use streaming translation
          let translatedText = "";
          await geminiRealTime.streamingTranslation(text, (chunk: string) => {
            translatedText = chunk;
          });
          return translatedText;
        }
      } catch (error) {
        console.error("Translation error:", error);
        return text;
      }
    },
    [],
  );

  const cancelPendingTranslation = useCallback(() => {
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
      translationTimeoutRef.current = null;
    }
  }, []);

  return {
    translateText,
    cancelPendingTranslation,
  };
};
