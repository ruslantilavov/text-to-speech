export const API_CONFIG = {
  GEMINI_API_KEY:
    import.meta.env.VITE_GEMINI_API_KEY ||
    "AIzaSyArMzc2xE1e9zpfowPpmbzQvZ-rEAPz3zo",
  TTS_API_URL: "https://oyqiz.airi.uz/api/v1/tts",
} as const;

export const SPEECH_CONFIG = {
  LANGUAGE: "uz-UZ", // Changed to Uzbek as the only input language
  CONTINUOUS: true,
  INTERIM_RESULTS: true,
  DEBOUNCE_DELAY: 0,
} as const;

export const SUPPORTED_LANGUAGES = {
  SPEECH_INPUT: [
    { code: "en", name: "English", flag: "🇬🇧", speechCode: "en-US" },
    { code: "de", name: "German", flag: "🇩🇪", speechCode: "de-DE" },
    { code: "ru", name: "Russian", flag: "🇷🇺", speechCode: "ru-RU" },
    { code: "ko", name: "Korean", flag: "🇰🇷", speechCode: "ko-KR" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", speechCode: "ja-JP" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", speechCode: "zh-CN" },
    { code: "fr", name: "French", flag: "🇫🇷", speechCode: "fr-FR" },
    { code: "es", name: "Spanish", flag: "🇪🇸", speechCode: "es-ES" },
    { code: "it", name: "Italian", flag: "🇮🇹", speechCode: "it-IT" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹", speechCode: "pt-PT" },
    { code: "nl", name: "Dutch", flag: "🇳🇱", speechCode: "nl-NL" },
    { code: "sv", name: "Swedish", flag: "🇸🇪", speechCode: "sv-SE" },
    { code: "no", name: "Norwegian", flag: "🇳🇴", speechCode: "no-NO" },
    { code: "da", name: "Danish", flag: "🇩🇰", speechCode: "da-DK" },
    { code: "fi", name: "Finnish", flag: "🇫🇮", speechCode: "fi-FI" },
    { code: "pl", name: "Polish", flag: "🇵🇱", speechCode: "pl-PL" },
    { code: "tr", name: "Turkish", flag: "🇹🇷", speechCode: "tr-TR" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", speechCode: "ar-SA" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", speechCode: "hi-IN" },
    { code: "th", name: "Thai", flag: "🇹🇭", speechCode: "th-TH" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳", speechCode: "vi-VN" },
  ],

  TTS_OUTPUT: [
    { code: "en", name: "English", flag: "🇺�", speechCode: "en-US" },
    { code: "de", name: "German", flag: "🇩🇪", speechCode: "de-DE" },
    { code: "ru", name: "Russian", flag: "🇷🇺", speechCode: "ru-RU" },
    { code: "ko", name: "Korean", flag: "🇰🇷", speechCode: "ko-KR" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", speechCode: "ja-JP" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", speechCode: "zh-CN" },
    { code: "fr", name: "French", flag: "🇫🇷", speechCode: "fr-FR" },
    { code: "es", name: "Spanish", flag: "🇪🇸", speechCode: "es-ES" },
    { code: "it", name: "Italian", flag: "🇮🇹", speechCode: "it-IT" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹", speechCode: "pt-PT" },
    { code: "nl", name: "Dutch", flag: "🇳🇱", speechCode: "nl-NL" },
    { code: "sv", name: "Swedish", flag: "🇸🇪", speechCode: "sv-SE" },
    { code: "no", name: "Norwegian", flag: "🇳🇴", speechCode: "no-NO" },
    { code: "da", name: "Danish", flag: "🇩🇰", speechCode: "da-DK" },
    { code: "fi", name: "Finnish", flag: "��", speechCode: "fi-FI" },
    { code: "pl", name: "Polish", flag: "🇵🇱", speechCode: "pl-PL" },
    { code: "tr", name: "Turkish", flag: "🇹🇷", speechCode: "tr-TR" },
    { code: "ar", name: "Arabic", flag: "🇸🇦", speechCode: "ar-SA" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", speechCode: "hi-IN" },
    { code: "th", name: "Thai", flag: "🇹🇭", speechCode: "th-TH" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳", speechCode: "vi-VN" },
    { code: "uz", name: "Uzbek", flag: "🇺🇿", speechCode: "uz-UZ" },
  ],
} as const;

export const UI_CONFIG = {
  HEADER: {
    TITLE: "🎤 Live Voice Translator",
    SUBTITLE: "Multiple Languages to Uzbek • Real-time transcription",
  },
  BUTTONS: {
    START: {
      ICON: "🎤",
      TEXT: "Start Live Translation",
    },
    STOP: {
      ICON: "⏹️",
      TEXT: "Stop Listening",
    },
  },
  LIVE_INDICATOR: {
    ICON: "🔴",
    TEXT: "LIVE - Speak clearly in your selected language",
  },
} as const;

export const ERROR_MESSAGES = {
  BROWSER_NOT_SUPPORTED:
    "Your browser doesn't support speech recognition features.",
  BROWSER_RECOMMENDATION:
    "Please try using Chrome, Edge, or Safari for the best experience.",
  SPEECH_RECOGNITION_ERROR:
    "Speech recognition is not supported in your browser",
  TTS_API_ERROR: "TTS API error",
  AUDIO_PLAYBACK_FAILED: "Audio playback failed",
  TRANSLATION_ERROR: "Translation error",
  GEMINI_INIT_FAILED: "Failed to initialize Gemini Real-Time service",
} as const;
