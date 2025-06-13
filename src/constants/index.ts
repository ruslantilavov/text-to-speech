export const API_CONFIG = {
  GEMINI_API_KEY:
    import.meta.env.VITE_GEMINI_API_KEY ||
    "AIzaSyDuDFzuEUrfkJbMUzD_pYQ-iraMDaRlGLI",
  TTS_API_URL: "https://oyqiz.airi.uz/api/v1/tts",
} as const;

export const SPEECH_CONFIG = {
  LANGUAGE: "en-US",
  CONTINUOUS: true,
  INTERIM_RESULTS: true,
  DEBOUNCE_DELAY: 0,
} as const;

export const UI_CONFIG = {
  HEADER: {
    TITLE: "🎤 Live Voice Translator",
    SUBTITLE: "English to Uzbek • Real-time transcription",
  },
  LANGUAGES: {
    ENGLISH: {
      NAME: "English",
      FLAG: "🇺🇸",
      CODE: "en",
    },
    UZBEK: {
      NAME: "Uzbek",
      FLAG: "🇺🇿",
      CODE: "uz",
    },
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
    TEXT: "LIVE - Speak clearly in English",
  },
} as const;

// Error Messages
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
