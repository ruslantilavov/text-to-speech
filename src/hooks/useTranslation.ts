import { useCallback, useRef, useState } from "react";
import { getGeminiRealTime } from "../utils/geminiLiveApi";

export interface UseTranslationReturn {
  translateText: (
    text: string,
    isFinal?: boolean,
    targetLanguage?: string,
    sourceLanguage?: string,
  ) => Promise<string>;
  cancelPendingTranslation: () => void;
  setTargetLanguage: (languageCode: string) => void;
  setSourceLanguage: (languageCode: string) => void;
  targetLanguage: string;
  sourceLanguage: string;
}

export const useTranslation = (): UseTranslationReturn => {
  const [targetLanguage, setTargetLanguageState] = useState<string>("uz"); // Fixed to Uzbek
  const [sourceLanguage, setSourceLanguageState] = useState<string>("en"); // Default to English
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      en: "English",
      de: "German",
      ru: "Russian",
      ko: "Korean",
      ja: "Japanese",
      zh: "Chinese",
      fr: "French",
      es: "Spanish",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      sv: "Swedish",
      no: "Norwegian",
      da: "Danish",
      fi: "Finnish",
      pl: "Polish",
      tr: "Turkish",
      ar: "Arabic",
      hi: "Hindi",
      th: "Thai",
      vi: "Vietnamese",
      uz: "Uzbek",
    };
    return languages[code] || code;
  };
  const translateText = useCallback(
    async (
      text: string,
      isFinal: boolean = false,
      overrideTargetLanguage?: string,
      overrideSourceLanguage?: string,
    ): Promise<string> => {
      const targetLang = overrideTargetLanguage || targetLanguage;
      const sourceLang = overrideSourceLanguage || sourceLanguage;
      const targetLanguageName = getLanguageName(targetLang);
      const sourceLanguageName = getLanguageName(sourceLang);

      const geminiRealTime = getGeminiRealTime();
      if (!geminiRealTime) {
        return text;
      }

      try {
        if (isFinal) {
          // For final results, get the complete translation
          const translationPrompt = `Translate the following ${sourceLanguageName} text to ${targetLanguageName}. Provide only the translation:

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
    [targetLanguage, sourceLanguage],
  );
  const cancelPendingTranslation = useCallback(() => {
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
      translationTimeoutRef.current = null;
    }
  }, []);
  const setTargetLanguageCallback = useCallback((languageCode: string) => {
    setTargetLanguageState(languageCode);
  }, []);

  const setSourceLanguageCallback = useCallback((languageCode: string) => {
    setSourceLanguageState(languageCode);
  }, []);

  return {
    translateText,
    cancelPendingTranslation,
    setTargetLanguage: setTargetLanguageCallback,
    setSourceLanguage: setSourceLanguageCallback,
    targetLanguage,
    sourceLanguage,
  };
};
