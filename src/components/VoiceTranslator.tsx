import React, { useEffect } from "react";
import { ERROR_MESSAGES, UI_CONFIG } from "../constants";
import { useLiveTranslation } from "../hooks/useLiveTranslation";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { initializeGeminiRealTime } from "../utils/geminiLiveApi";

// UI Components
import { BrowserSupport } from "./ui/BrowserSupport";
import { Controls } from "./ui/Controls";
import { ErrorMessage } from "./ui/ErrorMessage";
import { Header } from "./ui/Header";
import { LiveIndicator } from "./ui/LiveIndicator";
import { RealTimeTranscript } from "./ui/RealTimeTranscript";

import { useAudioPlayback } from "../hooks";
import "./VoiceTranslator.css";

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

      await handleFinalResult(transcript);
      // Audio will only play when user clicks the play button
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
      <ErrorMessage error={speechError} />{" "}
      <LiveIndicator
        isVisible={isListening}
        hasTranscript={
          !!(liveTranslation.englishFinal || liveTranslation.englishInterim)
        }
      />
      <RealTimeTranscript
        liveTranslation={liveTranslation}
        onPlayUzbekAudio={playUzbekAudio}
      />
      {/* <TranslationContainer
        liveTranslation={liveTranslation}
        onPlayUzbekAudio={playUzbekAudio}
      /> */}
    </div>
  );
};

export default VoiceTranslator;
