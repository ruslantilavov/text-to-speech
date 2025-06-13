/// <reference types="dom-speech-recognition" />

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

export class VoiceSpeechRecognition {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean;

  constructor() {
    this.isSupported =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

    if (this.isSupported) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";
    }
  }

  isAvailable(): boolean {
    return this.isSupported && this.recognition !== null;
  }

  startListening(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error("Speech recognition not supported"));
        return;
      }

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[0];
        if (result) {
          resolve({
            transcript: result[0].transcript,
            confidence: result[0].confidence,
          });
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {};

      try {
        this.recognition.start();
      } catch (error) {
        reject(error);
      }
    });
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export class TextToSpeech {
  private synth: SpeechSynthesis;
  private isSupported: boolean;

  constructor() {
    this.isSupported = "speechSynthesis" in window;
    this.synth = window.speechSynthesis;
  }

  isAvailable(): boolean {
    return this.isSupported;
  }

  speak(text: string, lang: string = "en-US"): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported) {
        reject(new Error("Text-to-speech not supported"));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event) =>
        reject(new Error(`Speech synthesis error: ${event.error}`));

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    if (this.isSupported) {
      this.synth.cancel();
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.isSupported ? this.synth.getVoices() : [];
  }
}
