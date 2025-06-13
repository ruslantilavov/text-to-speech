import React from "react";
import { LanguageSection } from "./LanguageSection";
import { UI_CONFIG } from "../../constants";
import type { LiveTranslation } from "../../hooks/useLiveTranslation";

interface TranslationContainerProps {
  liveTranslation: LiveTranslation;
  onPlayUzbekAudio?: (text: string) => void;
}

export const TranslationContainer: React.FC<TranslationContainerProps> = ({
  liveTranslation,
  onPlayUzbekAudio,
}) => {
  return (
    <div className="live-translation-container">
      <LanguageSection
        language="english"
        title={UI_CONFIG.LANGUAGES.ENGLISH.NAME}
        finalText={liveTranslation.englishFinal}
        interimText={liveTranslation.englishInterim}
        icon={UI_CONFIG.LANGUAGES.ENGLISH.FLAG}
      />
      <LanguageSection
        language="uzbek"
        title={UI_CONFIG.LANGUAGES.UZBEK.NAME}
        finalText={liveTranslation.uzbekFinal}
        interimText={liveTranslation.uzbekInterim}
        icon={UI_CONFIG.LANGUAGES.UZBEK.FLAG}
        onPlayAudio={onPlayUzbekAudio}
      />
    </div>
  );
};
