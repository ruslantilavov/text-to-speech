import { useCallback, useRef } from "react";
import { API_CONFIG, ERROR_MESSAGES } from "../constants";
import { extractTranslatedText } from "../utils";

export interface UseAudioPlaybackReturn {
  playUzbekAudio: (text: string) => Promise<void>;
  stopAudio: () => void;
}

export const useAudioPlayback = (): UseAudioPlaybackReturn => {
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const playUzbekAudio = useCallback(async (text: string): Promise<void> => {
    const readText = extractTranslatedText(text);
    console.log(text);
    console.log(readText);

    try {
      if (currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current = null;
      }

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
        throw new Error(`${ERROR_MESSAGES.TTS_API_ERROR}: ${response.status}`);
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
    } catch (error) {
      console.error(ERROR_MESSAGES.AUDIO_PLAYBACK_FAILED, error);
    }
  }, []);

  const stopAudio = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
  }, []);

  return {
    playUzbekAudio,
    stopAudio,
  };
};
