import { useCallback, useRef, useState } from "react";
import { useTranslation } from "./useTranslation";

export interface LiveTranslation {
  englishInterim: string;
  englishFinal: string;
  uzbekInterim: string;
  uzbekFinal: string;
  isTranslating: boolean;
  wordCount: number;
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
    isTranslating: false,
    wordCount: 0,
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
        isTranslating: true,
        wordCount: transcript
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
      }));

      // Cancel any pending translation
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      } // Immediate translation for interim results (no debounce for faster response)
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }

      // Translate immediately
      translationTimeoutRef.current = setTimeout(async () => {
        try {
          const translation = await translateText(transcript);
          setLiveTranslation((prev) => ({
            ...prev,
            uzbekInterim: translation,
            isTranslating: false,
          }));
        } catch (error) {
          console.error("Interim translation error:", error);
          setLiveTranslation((prev) => ({
            ...prev,
            isTranslating: false,
          }));
        }
      }, 50); // Very small delay for batching rapid speech changes
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
      } // Translate final result
      try {
        const translation = await translateText(transcript);

        setLiveTranslation((prev) => ({
          ...prev,
          uzbekFinal:
            prev.uzbekFinal + (prev.uzbekFinal ? " " : "") + translation,
          uzbekInterim: "", // Clear interim when we have final result
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
      uzbekInterim: "",
      uzbekFinal: "",
      isTranslating: false,
      wordCount: 0,
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
