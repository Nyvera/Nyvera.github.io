# Nyvera

Nyvera is a progressive web app (PWA) that lets you chat with models powered by WebLLM
. It’s designed to look sleek, run fast, and stay usable even when offline. Once installed, Nyvera behaves like a native app on desktop or mobile, complete with icons, splash screens, and offline support.

## ✨ Features

- Chat Interface – Seamless, modern chat UI built with Tailwind CSS.

- Model Selection – Choose different AI models from WebLLM.

- PWA Support – Installable on desktop and mobile, with offline caching.

- Offline Mode – Lets you chat OFFLINE.

- Theming – Colors and fonts configured for a clean, modern experience.

- Cross-Platform Support – Works on Chrome, Edge, Safari, and mobile browsers.

`
## 🚀 Getting Started
### 1. Clone the Repository

`git clone https://github.com/orgs/nyvera/nyvera.github.io.git`

`cd nyvera`

### 2. Add Icons

Place your generated icons in the /icons folder.

**Required: icon-192.png and icon-512.png**

*Optional: Apple Touch Icon (apple-touch-icon.png) and favicons*

If you don’t already have icons, you can generate them using a favicon generator (e.g. favicon.io
).*

### 3. Run Locally

You need a local server to test service workers (they don’t run from file://).

*Quick option: use Python’s HTTP server:*

#### Python 3
`python 
python -m http.server 8080
`


#### Then visit:

http://localhost:8080

### 4. Deploy

- GitHub Pages: Push to a GitHub repo and enable GitHub Pages in your repo settings.

- Netlify/Vercel: Drag and drop the project folder into your dashboard.

- Custom Hosting: Upload all files to your web server root.

## 📱 Installation (as PWA)

Open Nyvera in Chrome, Edge, or Safari.

Click the “Install App” prompt (or “Add to Home Screen” on iOS).

Launch it like a normal app — complete with splash screen and custom icon.

## ⚡ Offline Support

When online, assets and API calls are cached automatically.

If offline, cached assets load instantly.

If a requested resource isn’t available, the app displays offline.html.

This ensures the app feels responsive even without an internet connection.

## 🛠 Customization
### Colors & Theme

Change the theme color in:

manifest.json → "theme_color" and "background_color"

<meta name="theme-color"> inside index.html and offline.html

API Integration

Right now, the chat uses WebLLM to chat online and offline. You can swap this out with any other AI API by modifying the JavaScript fetch logic inside index.html.

Caching

Adjust what’s cached offline by editing the ASSETS array in sw.js.

## 🔒 Permissions

This app:

- Does not collect user data.

- Does not require login.

- Only communicates with external APIs when explicitly requested (Pollinations API).

## 🧩 Browser Compatibility

- Chrome / Edge (Desktop & Android) → Full support (PWA install, offline, push updates).

- Safari (iOS & macOS) → Supports install and Apple Touch Icon, but service workers have limited background functionality.

- Firefox → Works as a website but limited PWA features.

## 📜 License

This project is open-source under the MIT License.
You are free to use, modify, and distribute it with attribution.

# 🙌 Credits

### Built with Tailwind CSS

### Powered by WebLLM

### Icon design inspiration by Nyvera.
