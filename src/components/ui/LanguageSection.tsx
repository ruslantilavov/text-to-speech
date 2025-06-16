import React from "react";
import { extractTranslatedText } from "../../utils";

interface Language {
  code: string;
  name: string;
  flag: string;
  speechCode: string;
}

interface LanguageSectionProps {
  language: Language;
  title: string;
  finalText: string;
  interimText: string;
  isInputSection?: boolean;
  onPlayAudio?: (text: string, languageCode: string) => void;
}

export const LanguageSection: React.FC<LanguageSectionProps> = ({
  language,
  title,
  finalText,
  isInputSection = false,
  onPlayAudio,
}) => {
  const handlePlayAudio = () => {
    if (onPlayAudio && finalText) {
      const textToPlay = isInputSection
        ? finalText
        : extractTranslatedText(finalText);
      onPlayAudio(textToPlay, language.code);
    }
  };

  return (
    <div
      className={`language-section ${
        isInputSection ? "input" : "output"
      }-section`}
    >
      <h3>
        <span>
          {language.flag} {title}
        </span>
        {!isInputSection && finalText && (
          <button
            className="play-audio-button"
            onClick={handlePlayAudio}
            title={`Play ${language.name} audio`}
            aria-label={`Play ${language.name} audio`}
          >
            🔊
          </button>
        )}
      </h3>{" "}
      <div className="live-text">
        <p className="final-text">
          {isInputSection ? finalText : extractTranslatedText(finalText)}
        </p>
      </div>
    </div>
  );
};
