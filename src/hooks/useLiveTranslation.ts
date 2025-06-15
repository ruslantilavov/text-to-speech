import { useCallback, useRef, useState } from "react";
import { useTranslation } from "./useTranslation";
import { SPEECH_CONFIG } from "../constants";

export interface LiveTranslation {
  englishInterim: string;
  englishFinal: string;
  translatedInterim: string;
  translatedFinal: string;
  isTranslating: boolean;
  wordCount: number;
}

export interface UseLiveTranslationReturn {
  liveTranslation: LiveTranslation;
  handleInterimResult: (transcript: string) => void;
  handleFinalResult: (transcript: string) => Promise<string>;
  resetTranslation: () => void;
  setTargetLanguage: (languageCode: string) => void;
  setSourceLanguage: (languageCode: string) => void;
}

export const useLiveTranslation = (): UseLiveTranslationReturn => {
  const [, setTargetLanguageState] = useState<string>("en");
  const [liveTranslation, setLiveTranslation] = useState<LiveTranslation>({
    englishInterim: "",
    englishFinal: "",
    translatedInterim: "",
    translatedFinal: "",
    isTranslating: false,
    wordCount: 0,
  });
  const {
    translateText,
    cancelPendingTranslation,
    setTargetLanguage: setTranslationTargetLanguage,
    setSourceLanguage: setTranslationSourceLanguage,
  } = useTranslation();
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const handleInterimResult = useCallback(
    (transcript: string) => {
      // Update English interim result
      setLiveTranslation((prev) => ({
        ...prev,
        englishInterim: transcript,
        isTranslating: true,
        wordCount: transcript
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
      }));

      // Cancel any pending translation
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }

      // Debounce translation for interim results
      translationTimeoutRef.current = setTimeout(async () => {
        try {
          const translation = await translateText(transcript, false);
          setLiveTranslation((prev) => ({
            ...prev,
            translatedInterim: translation,
            isTranslating: false,
          }));
        } catch (error) {
          console.error("Interim translation error:", error);
          setLiveTranslation((prev) => ({
            ...prev,
            isTranslating: false,
          }));
        }
      }, SPEECH_CONFIG.DEBOUNCE_DELAY);
    },
    [translateText],
  );
  const handleFinalResult = useCallback(
    async (transcript: string): Promise<string> => {
      // Clear interim results and set final result
      const newEnglishFinal = (prev: LiveTranslation) =>
        prev.englishFinal + (prev.englishFinal ? " " : "") + transcript;

      setLiveTranslation((prev) => ({
        ...prev,
        englishFinal: newEnglishFinal(prev),
        englishInterim: "",
        isTranslating: true,
        wordCount: newEnglishFinal(prev)
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
      }));

      // Clear translation timeout
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }

      // Translate final result
      try {
        const translation = await translateText(transcript, true);
        setLiveTranslation((prev) => ({
          ...prev,
          translatedFinal:
            prev.translatedFinal +
            (prev.translatedFinal ? " " : "") +
            translation,
          translatedInterim: "", // Clear interim when we have final result
          isTranslating: false,
        }));

        return translation;
      } catch (error) {
        console.error("Final translation error:", error);
        setLiveTranslation((prev) => ({
          ...prev,
          isTranslating: false,
        }));
        return transcript;
      }
    },
    [translateText],
  );

  const resetTranslation = useCallback(() => {
    setLiveTranslation({
      englishInterim: "",
      englishFinal: "",
      translatedInterim: "",
      translatedFinal: "",
      isTranslating: false,
      wordCount: 0,
    });

    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
    }

    cancelPendingTranslation();
  }, [cancelPendingTranslation]);
  const setTargetLanguage = useCallback(
    (languageCode: string) => {
      setTargetLanguageState(languageCode);
      setTranslationTargetLanguage(languageCode);
    },
    [setTranslationTargetLanguage],
  );

  const setSourceLanguage = useCallback(
    (languageCode: string) => {
      setTranslationSourceLanguage(languageCode);
    },
    [setTranslationSourceLanguage],
  );

  return {
    liveTranslation,
    handleInterimResult,
    handleFinalResult,
    resetTranslation,
    setTargetLanguage,
    setSourceLanguage,
  };
};
