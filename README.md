# PWA Builder

Transform any web app into a standalone mobile application with one command!

## What Is This?

PWA Builder is a tool that lets you create Progressive Web Apps and easily convert them to native Android APKs. It's perfect for developers who want to build standalone mobile apps without dealing with complex native development.

Think of it like `create-react-app` but for building standalone mobile apps from web technologies.

## Features

- 🚀 **One-Command Setup**: Create a new project in seconds
- 📱 **One-Command Build**: Build APK with `npm run build`
- 🎨 **Automatic Icon Generation**: Convert one icon to all required sizes
- ⚙️ **Simple Configuration**: JSON-based config file
- 📸 **Camera Support**: Built-in camera functionality
- 🔔 **Local Notifications**: Push notifications without a server
- 📦 **Fully Standalone**: No server required, everything local
- 🎯 **Beginner Friendly**: Perfect for semi-developers

## Quick Start

### Create a New Project

```bash
# Option 1: Run the creator script
cd /path/to/pwa-builder
node create-pwa-app.js

# Option 2: Manual creation
# 1. Copy the 'template' folder
# 2. Rename it to your project name
# 3. Edit build-config.json
```

You'll be prompted to enter:
- Project name
- App display name
- App ID (com.yourname.appname)
- Description

### Install Dependencies

```bash
cd your-project-name
npm install
```

### Develop Your App

```bash
npm run serve
# Visit http://localhost:8000
```

Edit files in:
- `index.html` - Your main HTML
- `js/app.js` - Your JavaScript
- `styles/main.css` - Your CSS

### Build APK

```bash
npm run build
```

Your APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Requirements

1. **Node.js** (v14+): https://nodejs.org/
2. **Android Studio**: https://developer.android.com/studio
3. **Android SDK**: Installed via Android Studio

## Project Structure

```
pwa-builder/
├── create-pwa-app.js          ← Project creator script
├── package.json               ← NPX package config
├── README.md                  ← This file
└── template/                  ← Template files
    ├── build-config.json      ← App configuration
    ├── build-app.js           ← Build script
    ├── icon-generator.js      ← Icon generator
    ├── package.json           ← Dependencies
    ├── index.html             ← Starter HTML
    ├── manifest.json          ← PWA manifest
    ├── sw.js                  ← Service Worker
    ├── js/
    │   └── app.js             ← Starter JavaScript
    ├── styles/
    │   └── main.css           ← Starter CSS
    └── icons/                 ← Generated icons
```

## How It Works

1. **Template System**: Creates projects from a pre-configured template
2. **Configuration**: Simple JSON file controls all app settings
3. **Build Process**: Automated script handles Capacitor, Android, and APK generation
4. **Icon Generation**: Converts a single source icon to all required sizes

## Configuration

Edit `build-config.json` in your project:

```json
{
  "appName": "My App",
  "appId": "com.myname.myapp",
  "appDescription": "Does cool things",
  "backgroundColor": "#ffffff",
  "themeColor": "#4CAF50",
  "sourceIcon": "source-icon.png",
  "plugins": {
    "camera": { "enabled": true },
    "notifications": { "enabled": true }
  }
}
```

## Available Commands (in created projects)

```bash
npm run serve           # Development server
npm run generate-icons  # Generate icons from source image
npm run build          # Build APK
npm run clean          # Clean and rebuild
```

## Use Cases

Perfect for:
- Personal productivity apps
- Offline-first tools
- Games that run locally
- Educational apps
- Hobby projects
- Prototypes
- Internal company tools

## Examples

### Task Manager
```bash
node create-pwa-app.js
# Enter: task-manager, Task Manager, com.myname.tasks
cd task-manager
npm install
# Edit files, build app
npm run build
```

### Photo Journal
```bash
node create-pwa-app.js
# Enter: photo-journal, Photo Journal, com.myname.journal
cd photo-journal
npm install
# Enable camera in build-config.json
npm run build
```

## Tips

1. **Start Simple**: Use the template as-is first, then customize
2. **Test in Browser**: Always test with `npm run serve` before building
3. **Use localStorage**: Store data locally, no server needed
4. **High-Quality Icons**: Use 1024x1024 PNG for best results
5. **Clear Cache**: Clear browser cache when testing PWA features

## Troubleshooting

### Android SDK Not Found
Install Android Studio and ensure SDK is at:
- Windows: `C:\Users\<You>\AppData\Local\Android\Sdk`
- Mac: `~/Library/Android/sdk`
- Linux: `~/Android/Sdk`

### Build Fails
1. Check Android SDK is installed
2. Check Java JDK is available
3. Run `npm install` in your project
4. Try `npm run clean`

### Icons Not Generating
```bash
npm install sharp
```

## Contributing

This is based on the CleanQuest setup. Feel free to:
- Report issues
- Suggest improvements
- Share your projects

## License

MIT - Free to use for any project!

## Credits

Built by extracting and improving the build system from CleanQuest.

---

**Happy Building! 🚀**
