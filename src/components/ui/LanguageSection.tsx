import React from "react";
import { extractTranslatedText } from "../../utils";

interface LanguageSectionProps {
  language: "english" | "uzbek";
  title: string;
  finalText: string;
  interimText: string;
  icon: string;
  onPlayAudio?: (text: string) => void;
}

export const LanguageSection: React.FC<LanguageSectionProps> = ({
  language,
  title,
  finalText,
  icon,
  onPlayAudio,
}) => {
  const handlePlayAudio = () => {
    if (onPlayAudio && finalText) {
      onPlayAudio(finalText);
    }
  };
  return (
    <div className={`language-section ${language}-section`}>
      <h3>
        <span>
          {icon} {title}
        </span>
        {language === "uzbek" && finalText && (
          <button
            className="play-audio-button"
            onClick={handlePlayAudio}
            title="Play Uzbek audio"
            aria-label="Play Uzbek audio"
          >
            🔊
          </button>
        )}
      </h3>
      <div className="live-text">
        <p className="final-text">
          {language === "english"
            ? finalText
            : extractTranslatedText(finalText)}
        </p>
      </div>
    </div>
  );
};
