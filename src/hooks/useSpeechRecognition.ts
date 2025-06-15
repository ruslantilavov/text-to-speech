import { useCallback, useEffect, useRef, useState } from "react";
import {
  VoiceSpeechRecognition,
  type LiveSpeechCallbacks,
} from "../utils/speechUtils";
import { ERROR_MESSAGES } from "../constants";

export interface UseSpeechRecognitionProps {
  onInterimResult?: (transcript: string) => void;
  onFinalResult?: (transcript: string, confidence: number) => void;
  onError?: (error: Error) => void;
  onEnd?: () => void;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  setLanguage: (languageCode: string) => void;
}

export const useSpeechRecognition = ({
  onInterimResult,
  onFinalResult,
  onError,
  onEnd,
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const speechRecognition = useRef<VoiceSpeechRecognition | null>(null);
  const isManuallyStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    speechRecognition.current = new VoiceSpeechRecognition();
    setIsSupported(speechRecognition.current.isAvailable());

    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.stopListening();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!speechRecognition.current || !isSupported) {
      setError(ERROR_MESSAGES.SPEECH_RECOGNITION_ERROR);
      return;
    }

    setIsListening(true);
    setError(null);
    isManuallyStoppedRef.current = false;

    const callbacks: LiveSpeechCallbacks = {
      onInterimResult: (transcript: string) => {
        if (isManuallyStoppedRef.current) return;
        onInterimResult?.(transcript);
      },
      onFinalResult: (transcript: string, confidence: number) => {
        if (isManuallyStoppedRef.current) return;
        onFinalResult?.(transcript, confidence);
      },
      onError: (error: Error) => {
        if (!isManuallyStoppedRef.current) {
          setError(error.message);
          onError?.(error);
        }
        setIsListening(false);
      },
      onEnd: () => {
        if (!isManuallyStoppedRef.current) {
          setIsListening(false);
          onEnd?.();
        }
      },
    };

    speechRecognition.current.startLiveListening(callbacks);
  }, [isSupported, onInterimResult, onFinalResult, onError, onEnd]);

  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      speechRecognition.current.stopListening();
    }
    isManuallyStoppedRef.current = true;
    setIsListening(false);
  }, []);

  const setLanguage = useCallback(
    (languageCode: string) => {
      if (speechRecognition.current) {
        speechRecognition.current.setLanguage(languageCode);
      }
    },
    [speechRecognition],
  );

  return {
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    setLanguage,
  };
};
