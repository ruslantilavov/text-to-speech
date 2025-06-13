import React, { useEffect, useRef, useState } from "react";
import { TextToSpeech, VoiceSpeechRecognition } from "../utils/speechUtils";
import { translateTextEnhanced } from "../utils/translation";
import "./VoiceTranslator.css";

interface TranslationResult {
  english: string;
  uzbek: string;
}

function extractTranslatedText(responseString: string): string | null {
  const regex = /"translatedText":\s*"([^"]*)"/;

  const match = responseString.match(regex);

  return match ? match[1] : null;
}

const VoiceTranslator: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState<TranslationResult | null>(
    null,
  );

  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [ttsSupported, setTtsSupported] = useState(true);
  const speechRecognition = useRef<VoiceSpeechRecognition | null>(null);
  const textToSpeech = useRef<TextToSpeech | null>(null);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    speechRecognition.current = new VoiceSpeechRecognition();
    textToSpeech.current = new TextToSpeech();

    setSpeechSupported(speechRecognition.current.isAvailable());
    setTtsSupported(textToSpeech.current.isAvailable());

    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.stopListening();
      }
      if (textToSpeech.current) {
        textToSpeech.current.stop();
      }
    };
  }, []);
  const startListening = async () => {
    if (!speechRecognition.current || !speechSupported) {
      setError("Speech recognition is not supported in your browser");
      return;
    }

    setIsListening(true);
    setError(null);
    setTranslation(null);
    try {
      const result = await speechRecognition.current.startListening(); // Use enhanced translation
      const translationResult = await translateTextEnhanced(result.transcript);
      console.log("Full translation result:", translationResult);
      console.log(translationResult.translatedText);

      setTranslation({
        english: result.transcript,
        uzbek: translationResult.translatedText,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to recognize speech",
      );
    } finally {
      setIsListening(false);
    }
  };
  const readUzbek = async () => {
    if (!translation) {
      setError("No translation available to read");
      return;
    }

    setIsReading(true);
    setError(null);

    try {
      // Extract the Uzbek text from the translation
      const uzbekText = extractTranslatedText(translation.uzbek);
      if (!uzbekText) {
        setError("Failed to extract Uzbek text for reading.");
        return;
      }

      // Call the Uzbek TTS API
      const response = await fetch("https://oyqiz.airi.uz/api/v1/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: uzbekText,
          // Add other parameters if needed by the API
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.status}`);
      }

      // Get the audio data (assuming it returns audio blob)
      const audioBlob = await response.blob();
      // Create audio URL and play it
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudio.current = audio;

      // Play the audio
      await audio.play();

      // Clean up the URL when done
      audio.addEventListener("ended", () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio.current = null;
        setIsReading(false);
      });

      // Handle errors
      audio.addEventListener("error", () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio.current = null;
        setError("Failed to play audio");
        setIsReading(false);
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to read text with Uzbek TTS",
      );
    } finally {
      setIsReading(false);
    }
  };
  const stopListening = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stopListening();
    }
    setIsListening(false);
  };
  const stopReading = () => {
    // Stop the current audio if playing
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
      currentAudio.current = null;
    }

    // Also stop the old TTS if it was being used
    if (textToSpeech.current) {
      textToSpeech.current.stop();
    }

    setIsReading(false);
  };

  if (!speechSupported && !ttsSupported) {
    return (
      <div className="voice-translator">
        <div className="error-message">
          <h2>Browser Not Supported</h2>
          <p>
            Your browser doesn't support speech recognition or text-to-speech
            features.
          </p>
          <p>
            Please try using Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="voice-translator">
      <header className="header">
        <h1>English to Uzbek Voice Translator</h1>
      </header>
      <div className="controls">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={!speechSupported}
          className={`listen-button ${isListening ? "listening" : ""}`}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {isListening && (
        <div className="listening-indicator">
          <div className="pulse"></div>
          <p>Listening... Please speak in English</p>
        </div>
      )}
      {translation && (
        <div className="translation-result">
          <div className="translation-section">
            <h3>English (Speech to Text):</h3>
            <p className="english-text">{translation.english}</p>
          </div>
          <div className="translation-section">
            <h3>Uzbek (Translation):</h3>{" "}
            <p className="uzbek-text">
              {extractTranslatedText(translation.uzbek)}
            </p>
            <div className="audio-controls">
              <button
                onClick={isReading ? stopReading : readUzbek}
                disabled={!ttsSupported}
                className={`read-button ${isReading ? "reading" : ""}`}
              >
                {isReading ? "Stop Reading" : "Read Uzbek"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceTranslator;
