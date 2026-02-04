# Nyvera

Nyvera is a progressive web app (PWA) that lets you chat with AI models powered by WebLLM. Featuring a modern, ChatGPT-like interface inspired by OpenWebUI, it's designed to look sleek, run fast, and stay usable even when offline. Once installed, Nyvera behaves like a native app on desktop or mobile, complete with icons, splash screens, and offline support.

## ✨ Features

- **Modern ChatGPT-like Interface** – Clean, professional UI with sidebar navigation, conversation management, and dark theme inspired by OpenWebUI.

- **Conversation Management** – Create multiple chat sessions, switch between them, and maintain conversation history.

- **Sidebar Navigation** – Collapsible sidebar with conversation list, model selection, and settings.

- **Model Selection** – Choose different AI models from WebLLM's extensive library.

- **Text & Image Generation** – Supports both text chat and image generation using Pollinations API.

- **PWA Support** – Installable on desktop and mobile, with offline caching.

- **Offline Mode** – Chat with AI models completely offline once loaded.

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

## 🎨 New UI Features

### Sidebar Navigation
- Collapsible sidebar for easy access to conversations and settings
- "New Chat" button to start fresh conversations
- Conversation history with easy switching between chats
- Model selection integrated into the sidebar

### Chat Interface
- Clean, modern message bubbles for user and AI responses
- Markdown and code syntax highlighting support
- Copy button for AI responses
- Image generation support with `/image` command
- Example prompts to get started quickly

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

## 🔒 Permissions

This app:

- Does not collect user data.
- Does not require login.
- Only communicates with external APIs when explicitly requested (Pollinations API for images).
- Stores conversation history locally in your browser.

## 🧩 Browser Compatibility

- **Chrome / Edge (Desktop & Android)** → Full support (PWA install, offline, WebGPU for AI models).
- **Safari (iOS & macOS)** → Supports install and Apple Touch Icon, but service workers have limited background functionality.
- **Firefox** → Works as a website but limited PWA features.

**Note**: WebGPU is required for running AI models. Please use Chrome/Edge 113+ or check if WebGPU is enabled in your browser flags.

## 📜 License

This project is open-source under the MIT License.
You are free to use, modify, and distribute it with attribution.

## 🙌 Credits

- **UI Design**: Inspired by ChatGPT and OpenWebUI
- **Built with**: Vanilla JavaScript, HTML5, CSS3
- **Powered by**: WebLLM for offline AI inference
- **Image Generation**: Pollinations AI
- **Syntax Highlighting**: Highlight.js
- **Markdown Rendering**: Marked.js
- **Icon design**: Nyvera

## 🌟 What's New

**Latest Update: OpenWebUI-Inspired Interface**

- Complete UI overhaul with a modern, ChatGPT-like design
- Added sidebar navigation with conversation management
- Implemented conversation history and switching
- Added settings modal for better configuration
- Improved mobile responsiveness
- Enhanced message styling with copy functionality
- Added example prompts for quick start
- Better status indicators and progress tracking
