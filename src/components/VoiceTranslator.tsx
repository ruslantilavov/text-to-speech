import React, { useEffect, useState } from "react";
import { ERROR_MESSAGES, SUPPORTED_LANGUAGES } from "../constants";
import { useLiveTranslation } from "../hooks/useLiveTranslation";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { initializeGeminiRealTime } from "../utils/geminiLiveApi";

// UI Components
import { BrowserSupport } from "./ui/BrowserSupport";
import { Controls } from "./ui/Controls";
import DynamicLanguageSelector from "./ui/DynamicLanguageSelector";
import { ErrorMessage } from "./ui/ErrorMessage";
import { LiveIndicator } from "./ui/LiveIndicator";
import { RealTimeTranscript } from "./ui/RealTimeTranscript";

import "../components/ui/DynamicLanguageSelector.css";
import { useAudioPlayback } from "../hooks";
import "./VoiceTranslator.css";

interface Language {
  code: string;
  name: string;
  flag: string;
  speechCode: string;
}

const VoiceTranslator: React.FC = () => {
  const [inputLanguage, setInputLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES.SPEECH_INPUT[0],
  );
  const [outputLanguage] = useState<Language>(
    SUPPORTED_LANGUAGES.TTS_OUTPUT.find((lang) => lang.code === "uz") ||
      SUPPORTED_LANGUAGES.TTS_OUTPUT[0],
  );

  const { playAudio, stopAudio } = useAudioPlayback();
  const {
    liveTranslation,
    handleInterimResult,
    handleFinalResult,
    resetTranslation,
    setTargetLanguage,
    setSourceLanguage,
  } = useLiveTranslation();
  const {
    isListening,
    isSupported,
    error: speechError,
    startListening,
    stopListening,
    setLanguage,
  } = useSpeechRecognition({
    onInterimResult: handleInterimResult,
    onFinalResult: async (transcript: string, confidence: number) => {
      console.log(`Final result: "${transcript}" (confidence: ${confidence})`);
      await handleFinalResult(transcript);
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

    return () => {
      stopAudio();
    };
  }, [stopAudio]);
  useEffect(() => {
    setTargetLanguage("uz");
  }, [setTargetLanguage]);

  const handleStartListening = () => {
    resetTranslation();
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
    stopAudio();
  };
  const handleInputLanguageChange = (language: Language) => {
    setInputLanguage(language);
    setLanguage(language.speechCode);
    setSourceLanguage(language.code);
  };
  const handlePlayAudio = (text: string, languageCode: string) => {
    playAudio(text, languageCode);
  };

  if (!isSupported) {
    return <BrowserSupport />;
  }

  return (
    <div className="voice-translator live-mode">
      <div className="language-selectors">
        <DynamicLanguageSelector
          selectedLanguage={inputLanguage}
          onLanguageChange={handleInputLanguageChange}
          type="input"
        />
      </div>
      <Controls
        isListening={isListening}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
      />
      <ErrorMessage error={speechError} />
      <LiveIndicator
        isVisible={isListening}
        hasTranscript={
          !!(liveTranslation.englishFinal || liveTranslation.englishInterim)
        }
      />
      <RealTimeTranscript
        liveTranslation={liveTranslation}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
        onPlayAudio={handlePlayAudio}
      />
    </div>
  );
};

export default VoiceTranslator;
