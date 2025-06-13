// Test script to demonstrate JSON parsing
import { GeminiApiService } from "./src/utils/geminiApi.js";

// Your JSON response
const jsonResponse = `{
  "translatedText": "Bilmayman",
  "confidence": 0.99,
  "detectedLanguage": "en",
  "alternativeTranslations": ["Bilmayman.", "Men bilmayman."],
  "culturalNotes": "The phrase \"Bilmayman\" is the most common and direct translation of \"I don't know\" in Uzbek. Adding \"Men\" (meaning \"I\") before \"Bilmayman\" adds slight emphasis but is not always necessary."
}`;

// Parse and convert to JavaScript object
try {
  const result = GeminiApiService.parseJsonResponse(jsonResponse);

  console.log("\n=== CONVERTED RESULT ===");
  console.log("JavaScript Object:");
  console.log(result);

  console.log("\n=== INDIVIDUAL PROPERTIES ===");
  console.log('English: "I don\'t know"');
  console.log("Uzbek Translation:", result.translatedText);
  console.log("Confidence:", Math.round(result.confidence * 100) + "%");
  console.log("Detected Language:", result.detectedLanguage);
  console.log("Alternative Translations:");
  result.alternativeTranslations?.forEach((alt, index) => {
    console.log(`  ${index + 1}. ${alt}`);
  });
} catch (error) {
  console.error("Error:", error.message);
}
