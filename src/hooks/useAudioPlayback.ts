import { useCallback, useRef } from "react";
import { API_CONFIG, ERROR_MESSAGES } from "../constants";
import { extractTranslatedText } from "../utils";

export interface UseAudioPlaybackReturn {
  playUzbekAudio: (text: string) => Promise<void>;
  playAudio: (text: string, languageCode: string) => Promise<void>;
  stopAudio: () => void;
}

export const useAudioPlayback = (): UseAudioPlaybackReturn => {
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(
    async (text: string, languageCode: string): Promise<void> => {
      const readText = extractTranslatedText(text);
      console.log(`Playing audio for ${languageCode}:`, text);
      console.log("Clean text:", readText);

      try {
        if (currentAudio.current) {
          currentAudio.current.pause();
          currentAudio.current = null;
        }

        // For now, only Uzbek TTS is supported via the API
        if (languageCode === "uz") {
          const response = await fetch(API_CONFIG.TTS_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: readText,
            }),
          });

          if (!response.ok) {
            throw new Error(
              `${ERROR_MESSAGES.TTS_API_ERROR}: ${response.status}`,
            );
          }

          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          currentAudio.current = audio;

          await audio.play();

          audio.addEventListener("ended", () => {
            URL.revokeObjectURL(audioUrl);
            currentAudio.current = null;
          });

          audio.addEventListener("error", () => {
            URL.revokeObjectURL(audioUrl);
            currentAudio.current = null;
          });
        } else {
          // For other languages, use browser's speech synthesis as fallback
          if (readText) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(readText);

            // Try to find a voice for the target language
            const voices = synth.getVoices();
            const targetVoice = voices.find(
              (voice) =>
                voice.lang.startsWith(languageCode) ||
                voice.lang.startsWith(languageCode.split("-")[0]),
            );

            if (targetVoice) {
              utterance.voice = targetVoice;
            }

            utterance.lang = languageCode;
            synth.speak(utterance);
          }
        }
      } catch (error) {
        console.error(ERROR_MESSAGES.AUDIO_PLAYBACK_FAILED, error);
      }
    },
    [],
  );

  const playUzbekAudio = useCallback(
    async (text: string): Promise<void> => {
      return playAudio(text, "uz");
    },
    [playAudio],
  );

  const stopAudio = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    // Also stop speech synthesis
    window.speechSynthesis.cancel();
  }, []);

  return {
    playUzbekAudio,
    playAudio,
    stopAudio,
  };
};
