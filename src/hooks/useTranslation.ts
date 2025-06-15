import { useCallback, useRef } from "react";
import { fastUzbekTranslator } from "../utils/fastTranslator";

export interface UseTranslationReturn {
  translateText: (text: string) => Promise<string>;
  cancelPendingTranslation: () => void;
}

export const useTranslation = (): UseTranslationReturn => {
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const translateText = useCallback(async (text: string): Promise<string> => {
    if (!text.trim()) {
      return "";
    }

    try {
      const translation = await fastUzbekTranslator.translate(text);
      return translation;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  }, []);

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
