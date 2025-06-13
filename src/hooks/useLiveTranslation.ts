import { useCallback, useRef, useState } from "react";
import { useTranslation } from "./useTranslation";
import { SPEECH_CONFIG } from "../constants";

export interface LiveTranslation {
  englishInterim: string;
  englishFinal: string;
  uzbekInterim: string;
  uzbekFinal: string;
}

export interface UseLiveTranslationReturn {
  liveTranslation: LiveTranslation;
  handleInterimResult: (transcript: string) => void;
  handleFinalResult: (transcript: string) => Promise<string>;
  resetTranslation: () => void;
}

export const useLiveTranslation = (): UseLiveTranslationReturn => {
  const [liveTranslation, setLiveTranslation] = useState<LiveTranslation>({
    englishInterim: "",
    englishFinal: "",
    uzbekInterim: "",
    uzbekFinal: "",
  });

  const { translateText, cancelPendingTranslation } = useTranslation();
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const handleInterimResult = useCallback(
    (transcript: string) => {
      // Update English interim result
      setLiveTranslation((prev) => ({
        ...prev,
        englishInterim: transcript,
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
            uzbekInterim: translation,
          }));
        } catch (error) {
          console.error("Interim translation error:", error);
        }
      }, SPEECH_CONFIG.DEBOUNCE_DELAY);
    },
    [translateText],
  );

  const handleFinalResult = useCallback(
    async (transcript: string): Promise<string> => {
      // Clear interim results and set final result
      setLiveTranslation((prev) => ({
        ...prev,
        englishFinal:
          prev.englishFinal + (prev.englishFinal ? " " : "") + transcript,
        englishInterim: "",
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
          uzbekFinal:
            prev.uzbekFinal + (prev.uzbekFinal ? " " : "") + translation,
          uzbekInterim: "", // Clear interim when we have final result
        }));

        return translation;
      } catch (error) {
        console.error("Final translation error:", error);
        return transcript;
      }
    },
    [translateText],
  );

  const resetTranslation = useCallback(() => {
    setLiveTranslation({
      englishInterim: "",
      englishFinal: "",
      uzbekInterim: "",
      uzbekFinal: "",
    });

    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current);
    }

    cancelPendingTranslation();
  }, [cancelPendingTranslation]);

  return {
    liveTranslation,
    handleInterimResult,
    handleFinalResult,
    resetTranslation,
  };
};
