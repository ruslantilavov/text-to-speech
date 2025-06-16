import React from "react";
import type { LiveTranslation } from "../../hooks/useLiveTranslation";
import { extractTranslatedText2 } from "../../utils";
import { LanguageSection } from "./LanguageSection";

interface Language {
  code: string;
  name: string;
  flag: string;
  speechCode: string;
}

interface RealTimeTranscriptProps {
  liveTranslation: LiveTranslation;
  inputLanguage: Language;
  onPlayAudio?: (text: string, languageCode: string) => void;
}

export const RealTimeTranscript: React.FC<RealTimeTranscriptProps> = ({
  liveTranslation,
  inputLanguage,
  onPlayAudio,
}) => {
  return (
    <div className="real-time-transcript">
      <div className="transcript-header">
        <div className="header-left">
          <h2>🎤 Real-Time Transcript</h2>
          <div className="transcript-stats">
            {liveTranslation.wordCount > 0 && (
              <span className="word-count">
                {liveTranslation.wordCount} words
              </span>
            )}
            {liveTranslation.isTranslating && (
              <span className="translating-status">🔄 Translating...</span>
            )}
          </div>
        </div>
      </div>

      <div className="transcript-content">
        <LanguageSection
          language={inputLanguage}
          title={`${inputLanguage.name} (Input)`}
          finalText={liveTranslation.englishFinal}
          interimText={liveTranslation.englishInterim}
          isInputSection={true}
        />

        <LanguageSection
          language={{
            code: "uz",
            name: "Uzbek",
            flag: "🇺🇿",
            speechCode: "uz-UZ",
          }}
          title={`Uzbek (Output)`}
          finalText={extractTranslatedText2(liveTranslation.translatedFinal)}
          interimText={extractTranslatedText2(
            liveTranslation.translatedInterim,
          )}
          isInputSection={false}
          onPlayAudio={onPlayAudio}
        />
      </div>
    </div>
  );
};
