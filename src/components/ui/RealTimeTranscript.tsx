import React from "react";
import type { LiveTranslation } from "../../hooks/useLiveTranslation";
import { extractTranslatedText } from "../../utils";

interface RealTimeTranscriptProps {
  liveTranslation: LiveTranslation;
  onPlayUzbekAudio?: (text: string) => void;
}

export const RealTimeTranscript: React.FC<RealTimeTranscriptProps> = ({
  liveTranslation,
  onPlayUzbekAudio,
}) => {
  const handlePlayAudio = () => {
    if (onPlayUzbekAudio && liveTranslation.uzbekFinal) {
      const extractedText = liveTranslation.uzbekFinal;
      if (extractedText) {
        onPlayUzbekAudio(extractedText);
      }
    }
  };

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
        {liveTranslation.uzbekFinal && (
          <button
            className="play-all-audio-button"
            onClick={handlePlayAudio}
            title="Play full Uzbek translation"
            aria-label="Play full Uzbek translation"
          >
            🔊 Play All
          </button>
        )}
      </div>

      <div className="transcript-content">
        <div className="language-transcript english-transcript">
          <div className="transcript-label">🇺🇸 English</div>
          <div className="transcript-text">
            <div className="final-transcript">
              {liveTranslation.englishFinal}
            </div>
            {liveTranslation.englishInterim && (
              <div className="interim-transcript">
                {liveTranslation.englishInterim}
              </div>
            )}
          </div>
        </div>

        <div className="transcript-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">⟷</div>
          <div className="divider-line"></div>
        </div>

        <div className="language-transcript uzbek-transcript">
          <div className="transcript-label">🇺🇿 Uzbek</div>
          <div className="transcript-text">
            <div className="final-transcript">
              {extractTranslatedText(liveTranslation.uzbekFinal)}
            </div>
            {liveTranslation.uzbekInterim && (
              <div className="interim-transcript">
                {extractTranslatedText(liveTranslation.uzbekInterim)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
