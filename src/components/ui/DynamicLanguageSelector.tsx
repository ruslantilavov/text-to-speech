import React from "react";
import { Select, ConfigProvider } from "antd";
import { SUPPORTED_LANGUAGES } from "../../constants";
import "./DynamicLanguageSelector.css";

interface Language {
  code: string;
  name: string;
  flag: string;
  speechCode: string;
}

interface DynamicLanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  type: "input" | "output";
  disabled?: boolean;
}

export const DynamicLanguageSelector: React.FC<
  DynamicLanguageSelectorProps
> = ({ selectedLanguage, onLanguageChange, type, disabled = false }) => {
  const languages =
    type === "input"
      ? SUPPORTED_LANGUAGES.SPEECH_INPUT
      : SUPPORTED_LANGUAGES.TTS_OUTPUT;

  const handleLanguageSelect = (value: string) => {
    const selectedLang = languages.find((lang) => lang.code === value);
    if (selectedLang) {
      onLanguageChange(selectedLang);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3498db",
          borderRadius: 8,
        },
        components: {
          Select: {
            controlHeight: 36,
            controlHeightSM: 30,
            optionSelectedBg: "#e8f0fe",
            optionPadding: "6px 12px",
          },
        },
      }}
    >
      <Select
        className="ant-select-compact"
        value={selectedLanguage.code}
        onChange={handleLanguageSelect}
        disabled={disabled || (type === "input" && languages.length <= 1)}
        options={languages.map((lang) => ({
          value: lang.code,
          label: (
            <div className="select-option-with-flag">
              <span>{lang.name}</span>
            </div>
          ),
        }))}
        showSearch
        size="small"
        placeholder="Select language"
        style={{ width: "100%", maxWidth: "250px" }}
      />
    </ConfigProvider>
  );
};

export default DynamicLanguageSelector;
