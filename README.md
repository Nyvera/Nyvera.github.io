# Nyvera

Nyvera is a progressive web app (PWA) that lets you chat with AI models powered by WebLLM. Featuring a modern, ChatGPT-like interface, it's designed to look sleek, run fast, and work completely offline. All AI processing happens locally in your browser using WebGPU - no server required, complete privacy guaranteed. Once installed, Nyvera behaves like a native app on desktop or mobile, complete with icons, splash screens, and offline support.

## ✨ Features

- **Modern ChatGPT-like Interface** – Clean, professional UI with sidebar navigation, conversation management, and dark theme.

- **Completely Offline** – All AI processing happens locally in your browser using WebGPU. No internet required after initial setup.

- **Conversation Management** – Create multiple chat sessions, switch between them, and maintain conversation history locally.

- **Sidebar Navigation** – Collapsible sidebar with conversation list, model selection, and settings.

- **Model Selection** – Choose different AI models from WebLLM's extensive library.

- **Local AI Inference** – Powered by WebLLM for true offline AI chat with complete privacy.

- **PWA Support** – Installable on desktop and mobile, with offline caching.

- **Responsive Design** – Optimized for desktop, tablet, and mobile devices.

- **Cross-Platform Support** – Works on Chrome, Edge, Safari, and mobile browsers.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nyvera/Nyvera.github.io.git
cd Nyvera.github.io
```

### 2. Run Locally

You need a local server to test service workers (they don't run from file://).

**Quick option: use Python's HTTP server:**

```bash
# Python 3
python -m http.server 8080
```

Then visit: http://localhost:8080

### 3. Deploy

- **GitHub Pages**: Push to a GitHub repo and enable GitHub Pages in your repo settings.
- **Netlify/Vercel**: Drag and drop the project folder into your dashboard.
- **Custom Hosting**: Upload all files to your web server root.

## 📱 Installation (as PWA)

1. Open Nyvera in Chrome, Edge, or Safari.
2. Click the "Install App" prompt (or "Add to Home Screen" on iOS).
3. Launch it like a normal app — complete with splash screen and custom icon.

## ⚡ Offline Support

- When online, assets and API calls are cached automatically.
- If offline, cached assets load instantly.
- Models can run completely offline once loaded.
- This ensures the app feels responsive even without an internet connection.

## 🎨 UI Features

### Sidebar Navigation
- Collapsible sidebar for easy access to conversations and settings
- "New Chat" button to start fresh conversations
- Conversation history with easy switching between chats
- Model selection integrated into the sidebar

### Chat Interface
- Clean, modern message bubbles for user and AI responses
- Markdown and code syntax highlighting support
- Copy button for AI responses
- Example prompts to get started quickly
- Smooth animations and transitions

### Settings
- Centralized settings modal
- Export individual conversations
- Clear all chat history
- Model information display

## 🛠 Customization

### Colors & Theme

The new interface uses a dark theme inspired by ChatGPT and OpenWebUI. You can customize colors by modifying the CSS variables in `index.html`:

```css
:root {
  --bg-primary: #171717;
  --bg-secondary: #212121;
  --accent: #10a37f;
  /* ... and more */
}
```

### API Integration

Right now, the chat uses WebLLM to chat online and offline. You can swap this out with any other AI API by modifying the JavaScript logic inside `index.html`.

### Caching

Adjust what's cached offline by editing the ASSETS array in `sw.js`.

## 🔒 Privacy & Security

This app:

- **100% Private** - All AI processing happens locally in your browser using WebGPU
- Does not collect or transmit user data
- Does not require login or account creation
- Works completely offline after initial model download
- Stores conversation history locally in your browser only
- No external API calls for AI inference

## 🧩 Browser Compatibility

- **Chrome / Edge (Desktop & Android)** → Full support (PWA install, offline, WebGPU for AI models).
- **Safari (iOS & macOS)** → Supports install and Apple Touch Icon, but service workers have limited background functionality.
- **Firefox** → Works as a website but limited PWA features.

**Note**: WebGPU is required for running AI models. Please use Chrome/Edge 113+ or check if WebGPU is enabled in your browser flags.

## 📜 License

This project is open-source under the MIT License.
You are free to use, modify, and distribute it with attribution.

## 🙌 Credits

- **UI Design**: Inspired by ChatGPT
- **Built with**: Vanilla JavaScript, HTML5, CSS3
- **Powered by**: WebLLM for offline AI inference
- **Syntax Highlighting**: Highlight.js
- **Markdown Rendering**: Marked.js
- **Icon design**: Nyvera

## 🌟 What's New

**Latest Update: Focused Offline Experience**

- Removed image generation to focus on local AI chat
- Enhanced ChatGPT-like styling with better animations
- Improved offline capabilities - truly works without internet
- Better performance with streamlined codebase
- Complete privacy with 100% local AI processing
- Complete UI overhaul with a modern, ChatGPT-like design
- Added sidebar navigation with conversation management
- Implemented conversation history and switching
- Added settings modal for better configuration
- Improved mobile responsiveness
- Enhanced message styling with copy functionality
- Added example prompts for quick start
- Better status indicators and progress tracking
