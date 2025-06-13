# Gemini API Integration Demo Guide

This guide demonstrates how to use the Google Gemini API integration in the Voice Translator application.

## 🚀 Quick Start

### Getting Your Free Gemini API Key

1. **Visit Google AI Studio**: Go to [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
2. **Sign In**: Use your Google account to sign in
3. **Create API Key**:
   - Click "Get API Key"
   - Create a new project or select existing
   - Generate your free API key
4. **Copy the Key**: Save it securely

### Setting Up the Application

1. **Clone the repository** and install dependencies:

   ```bash
   npm install
   ```

2. **Create environment file**:

   ```bash
   cp .env.example .env
   ```

3. **Add your API key** to `.env`:

   ```
   VITE_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

## 🎯 Features Demonstration

### 1. Translation Modes

**Dictionary Mode (📚)**

- Best for: Common words and phrases
- Speed: Instant
- Offline: ✅ Works without internet
- Example: "Hello" → "Salom"

**AI Mode (🤖)**

- Best for: Complex sentences, context-dependent phrases
- Speed: 1-3 seconds
- Offline: ❌ Requires internet
- Example: "Could you please help me find the nearest hospital?" → Advanced contextual translation

**Hybrid Mode (⚡)**

- Best for: Balanced accuracy and speed
- Speed: Variable
- Offline: ✅ Falls back to dictionary
- Example: Uses AI when available, dictionary as backup

### 2. Enhanced Translation Features

**Alternative Translations**

```javascript
// Input: "Good morning"
// Primary: "Xayrli tong"
// Alternatives: ["Assalomu alaykum", "Hayrli erta", "Yaxshi tong"]
```

**Cultural Context**

```javascript
// Input: "Thank you"
// Translation: "Rahmat"
// Cultural Note: "In Uzbek culture, 'rahmat' is formal. 'Raxmat' is more casual."
```

**Confidence Scoring**

- Dictionary: 0.9 for exact matches, 0.5 for word-by-word
- AI: 0.8-0.95 based on context understanding
- Hybrid: Combined scoring for best accuracy

### 3. Audio Processing

**Speech Recognition Enhancement**

```javascript
// The app processes your speech and provides:
{
  transcript: "Hello, how are you today?",
  confidence: 0.92,
  language: "en-US"
}
```

**Audio Analysis** (Available with Gemini)

- Language detection
- Sentiment analysis
- Speech quality assessment
- Content summarization

## 🔧 Technical Implementation

### API Service Structure

```typescript
// Main Gemini API service
export class GeminiApiService {
  // Translation with context
  async translateText(text, targetLang, sourceLang, context);

  // Audio transcript analysis
  async processAudioTranscript(transcript, metadata);

  // Contextual responses
  async generateContextualResponse(input, context);

  // Batch operations
  async batchTranslate(texts, targetLang);
}
```

### Translation Pipeline

1. **Input Processing**: Clean and prepare text
2. **Mode Selection**: Choose translation strategy
3. **API Call**: Send to Gemini with context
4. **Response Processing**: Parse and validate results
5. **Fallback Handling**: Use dictionary if API fails
6. **UI Update**: Display results with alternatives

### Error Handling

```typescript
// Graceful degradation
try {
  const aiTranslation = await geminiApi.translateText(text);
  return aiTranslation;
} catch (error) {
  console.warn("AI translation failed, using dictionary");
  return dictionaryTranslate(text);
}
```

## 🎮 Usage Examples

### Basic Translation

1. Select "Hybrid Mode"
2. Click "Start Listening"
3. Say: "Where is the bathroom?"
4. View: AI-powered translation with alternatives

### Complex Sentence

1. Select "AI Mode"
2. Input: "I would appreciate it if you could help me understand the local customs"
3. Result: Contextually appropriate Uzbek translation with cultural notes

### Offline Usage

1. Turn off internet connection
2. Application automatically switches to Dictionary mode
3. Basic translations still work perfectly

### Batch Translation

```javascript
// For developers: Use the API directly
const texts = ["Hello", "Goodbye", "Thank you"];
const results = await geminiApi.batchTranslate(texts, "uz");
```

## 📊 Performance Comparison

| Feature        | Dictionary | AI (Gemini) | Hybrid        |
| -------------- | ---------- | ----------- | ------------- |
| Speed          | ⚡ Instant | 🔄 1-3s     | ⚡🔄 Variable |
| Accuracy       | 📚 Basic   | 🎯 High     | 🎯📚 Best     |
| Offline        | ✅ Yes     | ❌ No       | ✅ Fallback   |
| Context        | ❌ No      | ✅ Yes      | ✅ Yes        |
| Cultural Notes | ❌ No      | ✅ Yes      | ✅ Yes        |

## 🛠️ Troubleshooting

### Common Issues

**API Key Not Working**

- Verify the key is correct in `.env`
- Check if API key has proper permissions
- Ensure you're not exceeding rate limits

**Application Shows "Offline Mode"**

- Check internet connection
- Verify API key is valid
- Look at browser console for error messages

**Poor Translation Quality**

- Try switching to "AI Mode" for better accuracy
- Speak more clearly for better speech recognition
- Use "Hybrid Mode" for best of both worlds

### Debug Information

The application provides debug info in the footer:

- API Connection Status
- Available Models
- Current Translation Mode
- Browser Support Status

## 🎯 Best Practices

### For Users

1. **Start with Hybrid Mode** for best results
2. **Speak clearly** for better recognition
3. **Use complete sentences** for better AI translation
4. **Check alternatives** for different context options

### For Developers

1. **Handle API failures gracefully**
2. **Implement proper error boundaries**
3. **Cache translations** to reduce API calls
4. **Respect rate limits** and usage quotas

## 📈 Advanced Features

### Custom Context

```javascript
// Add context for better translations
await translateTextEnhanced(
  "Break a leg",
  "hybrid",
  "This is an idiomatic expression meaning good luck",
);
```

### Model Selection

```javascript
// Get available models
const models = geminiApi.getAvailableModels();
console.log(models); // Shows Gemini Pro, Gemini Pro Vision, etc.
```

### Usage Analytics

```javascript
// Track usage (mock implementation)
const stats = geminiApi.getUsageStats();
// { requestsToday: 45, tokensUsed: 12580, remainingQuota: 987420 }
```

This integration demonstrates enterprise-level implementation of Google Gemini API with proper error handling, fallback mechanisms, and user experience optimization.
