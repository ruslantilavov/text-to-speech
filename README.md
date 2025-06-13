# English to Uzbek Voice Translator with AI

A modern React TypeScript web application that provides real-time voice translation from English to Uzbek. The app integrates Google Gemini AI for enhanced translation accuracy while maintaining offline capabilities through a built-in dictionary.

## ✨ Features

### Core Features

- 🎤 **Speech Recognition**: Convert English speech to text using the Web Speech API
- 🤖 **AI-Powered Translation**: Enhanced translations using Google Gemini API
- 📚 **Offline Dictionary**: Fallback translation without internet connection
- 🔊 **Text-to-Speech**: Read the Uzbek translation aloud
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Processing**: Instant translation and speech synthesis

### Advanced AI Features

- 🧠 **Multiple Translation Modes**: Dictionary, AI, and Hybrid modes
- 🎯 **Context-Aware Translation**: Improved accuracy with contextual understanding
- 💡 **Translation Suggestions**: Alternative translations and improvements
- 🌍 **Cultural Notes**: Cultural context and usage tips
- 📊 **Confidence Scoring**: Translation quality indicators
- 🔄 **Batch Translation**: Process multiple texts at once

## 🚀 Technologies Used

- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Google Gemini AI** - Advanced language processing and translation
- **Web Speech API** - Browser-native speech recognition and synthesis
- **CSS3** - Modern styling with gradients and animations

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd text-to-speech
npm install
```

### 2. Get Google Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/gemini-api/docs)
2. Sign in with your Google account
3. Create a new project or select an existing one
4. Generate a free API key
5. Copy the API key for the next step

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` file and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to use the application.

## 🎯 Translation Modes

### 📚 Dictionary Mode (Fast)

- Uses built-in English-Uzbek dictionary
- Works offline
- Best for common words and phrases
- Instant response

### 🤖 AI Mode (Accurate)

- Uses Google Gemini AI
- Requires internet connection
- Best for complex sentences and context
- Provides cultural notes and suggestions

### ⚡ Hybrid Mode (Recommended)

- Combines both dictionary and AI
- Falls back to dictionary if API unavailable
- Provides alternative translations
- Balanced speed and accuracy

## 🔐 API Security

- API key is stored in environment variables
- Never commit your `.env` file to version control
- The application works offline if API is unavailable
- Free tier includes generous usage limits

## 📖 Usage Guide

1. **Select Translation Mode**: Choose between Dictionary, AI, or Hybrid mode
2. **Click "Start Listening"**: Allow microphone permissions if prompted
3. **Speak in English**: The app will convert your speech to text
4. **View Translation**: See the Uzbek translation with confidence score
5. **Listen to Translation**: Click "Read Uzbek" to hear the pronunciation
6. **Explore Alternatives**: View alternative translations and cultural notes

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── VoiceTranslator.tsx    # Main translator component
│   └── VoiceTranslator.css    # Component styles
├── utils/
│   ├── speechUtils.ts         # Speech recognition and TTS
│   ├── translation.ts         # Enhanced translation logic
│   └── geminiApi.ts          # Gemini API integration
└── main.tsx                   # App entry point
```

## Browser Support

This application requires browsers that support the Web Speech API:

- ✅ **Chrome/Chromium** (Recommended)
- ✅ **Microsoft Edge**
- ✅ **Safari** (macOS/iOS)
- ❌ **Firefox** (Limited support)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

1. **Click "Start Listening"** to begin speech recognition
2. **Speak in English** - the app will capture your speech and convert it to text
3. **View the Translation** - see the English text and its Uzbek translation
4. **Click "Read Uzbek"** to hear the translation spoken aloud

## Translation Dictionary

The app includes a built-in English-to-Uzbek dictionary covering:

- Basic vocabulary (hello, goodbye, thank you, etc.)
- Common phrases and sentences
- Numbers 1-10
- Everyday words and expressions

## Project Structure

```
src/
├── components/
│   ├── VoiceTranslator.tsx    # Main component
│   └── VoiceTranslator.css    # Component styles
├── utils/
│   ├── speechUtils.ts         # Speech recognition and TTS utilities
│   └── translation.ts         # Translation dictionary and logic
├── App.tsx                    # App component
├── App.css                    # App styles
├── index.css                  # Global styles
└── main.tsx                   # Entry point
```

## Contributing

This is a learning project. Feel free to:

- Add more translations to the dictionary
- Improve the UI/UX design
- Add support for more languages
- Enhance error handling

## Note

This is a basic translation tool created for educational purposes. For professional translations, please consult a qualified translator.

## License

This project is open source and available under the MIT License.
