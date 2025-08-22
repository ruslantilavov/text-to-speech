import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  "AIzaSyBuwaVFpcL7rRrsWwwLE-M3LGwnirFTrjc";

export interface GeminiTranslationResult {
  translatedText: string;
  confidence: number;
  detectedLanguage?: string;
  alternativeTranslations?: string[];
}

export interface GeminiAudioAnalysis {
  transcript: string;
  language: string;
  confidence: number;
  sentiment?: string;
  summary?: string;
}

export interface GeminiModelInfo {
  name: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
  supportedGenerationMethods: string[];
  temperature?: number;
  topP?: number;
  topK?: number;
}

export class GeminiApiService {
  private genAI: GoogleGenerativeAI;
  private models: Map<string, GenerativeModel> = new Map();
  private availableModels: GeminiModelInfo[] = [];

  constructor() {
    if (!API_KEY || API_KEY === "AIzaSyBuwaVFpcL7rRrsWwwLE-M3LGwnirFTrjc") {
      console.warn(
        "Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables."
      );
    }
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.initializeModels();
  }
  private async initializeModels(): Promise<void> {
    try {
      this.models.set(
        "gemini-2.5-flash-preview-05-20",
        this.genAI.getGenerativeModel({
          model: "gemini-2.5-flash-preview-05-20",
        })
      );

      this.availableModels = [
        {
          name: "gemini-2.5-flash-preview-05-20",
          displayName: "Gemini 2.0 Flash",
          description: "Latest and most capable model for all text tasks",
          inputTokenLimit: 1000000,
          outputTokenLimit: 8192,
          supportedGenerationMethods: [
            "generateContent",
            "generateContentStream",
          ],
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      ];
    } catch (error) {
      console.error("Failed to initialize Gemini models:", error);
    }
  }

  public getAvailableModels(): GeminiModelInfo[] {
    return this.availableModels;
  }
  public async translateText(
    text: string,
    sourceLanguage: string = "auto"
  ): Promise<GeminiTranslationResult> {
    const model = this.models.get("gemini-2.5-flash-preview-05-20");
    if (!model) {
      throw new Error("Gemini 2.0 Flash model not initialized");
    }

    try {
      const prompt = ` Translate the following text from ${sourceLanguage} to Uzbek. Provide only the translation in JSON format:
"${text}"`;

      const result = await model.generateContent(prompt);

      const response = await result.response;
      const text_response = response.text();

      try {
        const parsedResult = JSON.parse(text_response);
        return {
          translatedText: parsedResult.translatedText,
          confidence: parsedResult.confidence || 0.8,
          detectedLanguage: parsedResult.detectedLanguage,
          alternativeTranslations: parsedResult.alternativeTranslations || [],
        };
      } catch {
        return {
          translatedText: text_response,
          confidence: 0.7,
          detectedLanguage: sourceLanguage,
          alternativeTranslations: [],
        };
      }
    } catch (error) {
      console.error("Translation error:", error);
      throw new Error(
        `Translation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Process audio data and extract information
   * Note: This simulates audio processing since direct audio input requires specific formatting
   */ public async processAudioTranscript(
    transcript: string,
    audioMetadata?: {
      duration?: number;
      sampleRate?: number;
      language?: string;
    }
  ): Promise<GeminiAudioAnalysis> {
    const model = this.models.get("gemini-2.5-flash-preview-05-20");
    if (!model) {
      throw new Error("Gemini 2.0 Flash model not initialized");
    }

    try {
      const prompt = `Analyze the following audio transcript and provide detailed analysis:

Transcript: "${transcript}"
${audioMetadata ? `Audio Metadata: ${JSON.stringify(audioMetadata)}` : ""}

Please analyze and provide:
1. Language detection and confidence
2. Sentiment analysis
3. Content summary
4. Speech quality assessment
5. Any notable patterns or characteristics

Respond in JSON format:
{
  "transcript": "cleaned transcript",
  "language": "detected language code",
  "confidence": 0.95,
  "sentiment": "positive/negative/neutral",
  "summary": "brief summary of content",
  "qualityScore": 0.9,
  "characteristics": ["characteristic1", "characteristic2"]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text_response = response.text();

      try {
        const parsedResult = JSON.parse(text_response);
        return {
          transcript: parsedResult.transcript || transcript,
          language: parsedResult.language || "en",
          confidence: parsedResult.confidence || 0.8,
          sentiment: parsedResult.sentiment,
          summary: parsedResult.summary,
        };
      } catch {
        return {
          transcript: transcript,
          language: "en",
          confidence: 0.7,
          sentiment: "neutral",
          summary: "Audio analysis completed",
        };
      }
    } catch (error) {
      console.error("Audio analysis error:", error);
      throw new Error(
        `Audio analysis failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  public async generateContextualResponse(
    input: string,
    context: "translation" | "conversation" | "learning" | "correction",
    additionalParams?: Record<string, string | number | boolean>
  ): Promise<string> {
    const model = this.models.get("gemini-2.5-flash-preview-05-20");
    if (!model) {
      throw new Error("Gemini 2.0 Flash model not initialized");
    }

    let prompt = "";

    switch (context) {
      case "translation":
        prompt = `As a professional translator, improve or provide alternatives for this translation:
Input: "${input}"
${
  additionalParams?.sourceLanguage
    ? `Source Language: ${additionalParams.sourceLanguage}`
    : ""
}
${
  additionalParams?.targetLanguage
    ? `Target Language: ${additionalParams.targetLanguage}`
    : ""
}

Provide improved translation with cultural context and natural phrasing.`;
        break;

      case "conversation":
        prompt = `Continue this conversation naturally in both English and Uzbek:
Current context: "${input}"
Provide appropriate responses that would help language learners.`;
        break;

      case "learning":
        prompt = `As a language learning assistant, provide educational content based on:
Topic: "${input}"
Include vocabulary, grammar tips, and practice examples for English-Uzbek language pair.`;
        break;

      case "correction":
        prompt = `Analyze and correct the following text, providing explanations:
Text: "${input}"
Provide corrections with explanations for language learners.`;
        break;
    }

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Contextual response error:", error);
      throw new Error(
        `Failed to generate response: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  public async batchTranslate(
    texts: string[],
    targetLanguage: string = "uz"
  ): Promise<GeminiTranslationResult[]> {
    const promises = texts.map((text) =>
      this.translateText(text, targetLanguage)
    );

    try {
      return await Promise.all(promises);
    } catch (error) {
      console.error("Batch translation error:", error);
      throw new Error(
        `Batch translation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  public async checkApiHealth(): Promise<boolean> {
    try {
      const model = this.models.get("gemini-2.5-flash-preview-05-20");
      if (!model) return false;

      const result = await model.generateContent('Hello, respond with "OK"');
      const response = await result.response;
      const text = response.text();

      return text.toLowerCase().includes("ok");
    } catch (error) {
      console.error("API health check failed:", error);
      return false;
    }
  }

  public getUsageStats(): {
    requestsToday: number;
    tokensUsed: number;
    remainingQuota: number;
  } {
    return {
      requestsToday: 0,
      tokensUsed: 0,
      remainingQuota: 1000000,
    };
  }

  public static parseJsonResponse(jsonString: string): GeminiTranslationResult {
    try {
      console.log("Raw JSON response:", jsonString);

      let cleanJson = jsonString.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.replace(/```json\s*/, "").replace(/```\s*$/, "");
      }

      const parsedResult = JSON.parse(cleanJson);

      const result: GeminiTranslationResult = {
        translatedText: parsedResult.translatedText,
        confidence: parsedResult.confidence || 0.8,
        detectedLanguage: parsedResult.detectedLanguage,
        alternativeTranslations: parsedResult.alternativeTranslations || [],
      };

      return result;
    } catch (error) {
      console.error("JSON parsing error:", error);
      throw new Error("Failed to parse JSON response");
    }
  }
}

export const geminiApi = new GeminiApiService();
