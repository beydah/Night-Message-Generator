night-message-generator/
├── index.html          # Main HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── .env                # Environment variables (API Key)
├── src/
│   ├── css/
│   │   └── style.css   # Styles and themes
│   └── js/
│       ├── main.js     # Entry point
│       ├── api.js      # API logic
│       ├── ui.js       # UI manipulation
│       ├── state.js    # State management
│       ├── utils.js    # Utilities
│       └── config.js   # Configuration
├── readme.md           # Project documentation
├── license             # Project license

# 🌙 Night Message Generator

A beautiful, multilingual web application that generates personalized good night messages using AI. Now powered by **Vite** for a modern development experience and better security.

![Night Message Generator](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF)

## ✨ Features

- **🌍 Multi-language Support**: Turkish, Azerbaijani, English, German, and Russian
- **🎨 Customizable Settings**: Message length, sincerity, misspelling, emoji, and punctuation
- **🌓 Dark/Light Theme**: Automatic theme switching
- **📱 Responsive Design**: Works on all devices
- **🎯 AI-Powered**: Uses Google's Gemini AI
- **⚡ Fast Development**: Instant server start and HMR with Vite
- **🔒 Secure Configuration**: API key handling via environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/yourusername/night-message-generator.git
   cd night-message-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - The project expects a `.env` file in the root directory. I have created one for you, but for security, ensure it's not committed to public repositories if you push this code.
   - Content of `.env`:
     ```properties
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).

## 🛠️ Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔧 Project Structure

The project has been migrated to a standardized Vite structure:

- **`index.html`**: The entry point, located at the project root.
- **`src/js/main.js`**: The JavaScript entry point, which imports styles and other modules.
- **`src/css/style.css`**: The main stylesheet, imported by `main.js`.
- **`src/js/config.js`**: Handles configuration and reads the API key from `import.meta.env`.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `license` for more information.

## 📞 Contact

**Beydah Saglam**
- Website: [beydahsaglam.com](https://beydahsaglam.com)
