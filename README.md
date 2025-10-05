# 🌙 Night Message Generator

A beautiful, multilingual web application that generates personalized good night messages using AI. Create heartfelt messages with customizable tone, style, and language preferences.

![Night Message Generator](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **🌍 Multi-language Support**: Turkish, Azerbaijani, English, German, and Russian
- **🎨 Customizable Settings**:
  - Message length (5-50 words)
  - Sincerity levels (1-10)
  - Intentional misspelling intensity
  - Emoji usage control
  - Punctuation intensity
- **🌓 Dark/Light Theme**: Automatic theme switching with smooth transitions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎯 AI-Powered**: Uses Google's Gemini AI for natural message generation
- **💾 Settings Persistence**: Your preferences are saved locally
- **🔒 Privacy-Focused**: All data stays in your browser

## 🚀 Demo

[Live Demo](https://night-message-generator.netlify.app/)

## 🛠️ Installation

### Option 1: Direct Download

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start generating beautiful night messages!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/night-message-generator.git

# Navigate to project directory
cd night-message-generator

# Open with a local server (recommended)
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🔧 Configuration

### API Key Setup

The application uses Google's Gemini AI API. The API key is obfuscated in the code for basic security, but for production use, consider:

1. **Environment Variables**: Store the API key in environment variables
2. **Backend Proxy**: Create a backend service to handle API calls
3. **Rate Limiting**: Implement proper rate limiting for production

### Customization

- **Colors**: Modify CSS custom properties in `style.css`
- **Languages**: Add new languages in the `TRANSLATIONS` object in `script.js`
- **Themes**: Extend the theme system in the CSS variables

## 🌐 Supported Languages

| Language    | Code | Status      |
| ----------- | ---- | ----------- |
| Turkish     | `tr` | ✅ Complete |
| Azerbaijani | `az` | ✅ Complete |
| English     | `en` | ✅ Complete |
| German      | `de` | ✅ Complete |
| Russian     | `ru` | ✅ Complete |

## 📁 Project Structure

```
night-message-generator/
├── index.html          # Main HTML file
├── style.css           # Styles and themes
├── script.js           # Application logic
├── README.md           # Project documentation
├── LICENSE             # Project license
```

## 🎯 Usage

1. **Select Language**: Choose your preferred language from the settings menu
2. **Customize Settings**:
   - Adjust message length (5-50 words)
   - Set sincerity level (1-10)
   - Configure misspelling intensity
   - Control emoji usage
   - Set punctuation intensity
3. **Generate Messages**: Click the generate button to create 5 unique messages
4. **Copy & Share**: Click any message to copy it to your clipboard

## 🔒 Privacy & Security

- **Local Storage**: All settings are stored locally in your browser
- **No Data Collection**: No personal data is sent to external servers
- **API Security**: API keys are obfuscated (consider backend proxy for production)
- **HTTPS Ready**: Fully compatible with HTTPS deployment

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Areas for Contribution

- 🌍 Additional language translations
- 🎨 New themes and color schemes
- 🔧 Performance optimizations
- 📱 Mobile UX improvements
- 🧪 Testing and bug fixes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For powering the message generation
- **Tailwind CSS** - For the beautiful styling framework
- **Lucide Icons** - For the clean and modern icons
- **Inter Font** - For the elegant typography

## 📞 Contact

**Beydah Saglam**

- Website: [beydahsaglam.com](https://beydahsaglam.com)
- GitHub: [@beydah](https://github.com/beydah)

## 💖 Special Thanks

This project was created with love for Beyza ❤️

---

⭐ If you found this project helpful, please give it a star on GitHub!

