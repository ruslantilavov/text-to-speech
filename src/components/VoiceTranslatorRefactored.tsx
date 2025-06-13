import React, { useEffect } from "react";
import { initializeGeminiRealTime } from "../utils/geminiLiveApi";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useLiveTranslation } from "../hooks/useLiveTranslation";
import { UI_CONFIG, ERROR_MESSAGES } from "../constants";

// UI Components
import { Header } from "./ui/Header";
import { Controls } from "./ui/Controls";
import { LiveIndicator } from "./ui/LiveIndicator";
import { ErrorMessage } from "./ui/ErrorMessage";
import { TranslationContainer } from "./ui/TranslationContainer";
import { BrowserSupport } from "./ui/BrowserSupport";

import "./VoiceTranslator.css";
import { useAudioPlayback } from "../hooks";

const VoiceTranslator: React.FC = () => {
  const { playUzbekAudio, stopAudio } = useAudioPlayback();
  const {
    liveTranslation,
    handleInterimResult,
    handleFinalResult,
    resetTranslation,
  } = useLiveTranslation();

  const {
    isListening,
    isSupported,
    error: speechError,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    onInterimResult: handleInterimResult,
    onFinalResult: async (transcript: string, confidence: number) => {
      console.log(`Final result: "${transcript}" (confidence: ${confidence})`);

      const translation = await handleFinalResult(transcript);

      // Auto-play the translated audio
      if (translation) {
        await playUzbekAudio(translation);
      }
    },
    onError: (error: Error) => {
      console.error("Speech recognition error:", error);
    },
    onEnd: () => {
      console.log("Speech recognition ended");
    },
  });

  // Initialize Gemini API on component mount
  useEffect(() => {
    try {
      initializeGeminiRealTime();
    } catch (error) {
      console.warn(ERROR_MESSAGES.GEMINI_INIT_FAILED, error);
    }

    // Cleanup on unmount
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  const handleStartListening = () => {
    resetTranslation();
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
    stopAudio();
  };

  // Show browser support message if speech recognition is not supported
  if (!isSupported) {
    return <BrowserSupport />;
  }

  return (
    <div className="voice-translator live-mode">
      <Header
        title={UI_CONFIG.HEADER.TITLE}
        subtitle={UI_CONFIG.HEADER.SUBTITLE}
      />

      <Controls
        isListening={isListening}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
      />

      <ErrorMessage error={speechError} />

      <LiveIndicator isVisible={isListening} />

      <TranslationContainer liveTranslation={liveTranslation} />
    </div>
  );
};

export default VoiceTranslator;
