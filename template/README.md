# PWA Builder Template

Transform your web app into a standalone mobile application with one command!

## What is This?

PWA Builder is a template that lets you build Progressive Web Apps and convert them to native Android APKs easily. Perfect for developers who want to create standalone mobile apps without dealing with complex native development.

## Features

- ✅ **One-Command Build**: `npm run build` creates a ready-to-install APK
- ✅ **Fully Standalone**: No server required, everything runs locally
- ✅ **Offline Support**: Service Worker caching built-in
- ✅ **Camera Support**: Capture photos natively (optional)
- ✅ **Local Notifications**: Push notifications without a server (optional)
- ✅ **Easy Configuration**: JSON-based configuration file
- ✅ **Icon Generation**: Automatic icon generation from a single source image
- ✅ **Responsive Design**: Mobile-first starter template

## Requirements

Before you start, you need:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/

2. **Android SDK** (via Android Studio)
   - Download: https://developer.android.com/studio
   - After installation, open Android Studio and install Android SDK
   - Default location: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`

3. **Java JDK 11+** (usually comes with Android Studio)
   - Location: `C:\Program Files\Android\Android Studio\jbr`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your App

Edit `build-config.json`:

```json
{
  "appName": "My Awesome App",
  "appId": "com.myname.awesomeapp",
  "appDescription": "Does awesome things",
  "backgroundColor": "#ffffff",
  "themeColor": "#4CAF50"
}
```

**Important Fields:**
- `appName`: Your app's display name
- `appId`: Unique identifier (format: com.yourname.appname)
- `appDescription`: Brief description
- `sourceIcon`: Path to your app icon (PNG, 1024x1024 recommended)

### 3. (Optional) Generate Icons

If you have a source icon:

```bash
npm run generate-icons
```

This creates all required icon sizes from your source image.

### 4. Build Your Web App

Edit the files in:
- `index.html` - Your main page
- `js/app.js` - Your JavaScript logic
- `styles/main.css` - Your styles

Test in browser:

```bash
npm run serve
# Visit http://localhost:8000
```

### 5. Build APK

When ready:

```bash
npm run build
```

Your APK will be created at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Project Structure

```
my-pwa-app/
├── build-config.json       ← Configure your app here
├── build-app.js            ← Build script (don't modify)
├── icon-generator.js       ← Icon generator (don't modify)
├── package.json            ← Dependencies
├── index.html              ← Your main HTML
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker
├── source-icon.png         ← Your app icon (1024x1024)
├── js/
│   └── app.js              ← Your JavaScript
├── styles/
│   └── main.css            ← Your CSS
├── icons/                  ← Generated icons
└── www/                    ← Generated (build artifact)
```

## Configuration Options

### build-config.json

```json
{
  "appName": "string",           // App display name
  "appId": "string",             // Unique ID (com.company.app)
  "appDescription": "string",    // Short description
  "version": "string",           // Version number
  "backgroundColor": "string",   // Background color (#hex)
  "themeColor": "string",        // Theme color (#hex)
  "sourceIcon": "string",        // Path to source icon

  "android": {
    "minSdkVersion": 22,         // Minimum Android version
    "targetSdkVersion": 33,      // Target Android version
    "allowMixedContent": true,   // Allow HTTP content
    "webContentsDebuggingEnabled": true  // Enable debugging
  },

  "plugins": {
    "camera": {
      "enabled": true            // Enable camera plugin
    },
    "notifications": {
      "enabled": true,           // Enable notifications
      "smallIcon": "ic_stat_notification",
      "iconColor": "#4CAF50"
    }
  },

  "filesToCopy": [               // Files to include in build
    "index.html",
    "manifest.json",
    "sw.js"
  ],

  "foldersToCopy": [             // Folders to include in build
    "js",
    "styles",
    "icons",
    "assets"
  ]
}
```

## Using Capacitor Plugins

### Camera

```javascript
async function takePhoto() {
    const image = await Capacitor.Plugins.Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: 'DataUrl'
    });
    console.log('Photo:', image.dataUrl);
}
```

### Local Notifications

```javascript
async function notify() {
    await Capacitor.Plugins.LocalNotifications.schedule({
        notifications: [{
            title: "Hello!",
            body: "This is a notification",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }
        }]
    });
}
```

## Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run serve
npm run dev

# Generate icons from source image
npm run generate-icons

# Build APK
npm run build

# Clean and rebuild
npm run clean
```

## Development Workflow

1. **Develop in Browser**
   ```bash
   npm run serve
   ```
   Visit http://localhost:8000 and develop your app

2. **Test Changes**
   - Edit HTML/CSS/JS
   - Refresh browser to see changes
   - Test all functionality

3. **Build APK**
   ```bash
   npm run build
   ```

4. **Install on Device**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Troubleshooting

### Build Fails - Android SDK Not Found

**Error:** `Android SDK not found`

**Solution:**
1. Install Android Studio
2. Open Android Studio
3. Go to Settings → Appearance & Behavior → System Settings → Android SDK
4. Note the SDK location (usually `C:\Users\<You>\AppData\Local\Android\Sdk`)
5. Make sure it exists at that location

### Build Fails - Java Version

**Error:** `Could not determine java version`

**Solution:**
- Android Studio includes Java JDK
- Location: `C:\Program Files\Android\Android Studio\jbr`
- The build script auto-detects this

### Icons Not Generating

**Error:** `sharp package not installed`

**Solution:**
```bash
npm install sharp
```

### App Doesn't Install on Phone

**Solution:**
1. Enable "Unknown Sources" in Android settings
2. Use `adb install` command
3. Or transfer APK to phone and install manually

## Tips

- **Keep It Simple**: Start with basic HTML/CSS/JS
- **Test Often**: Test in browser before building APK
- **Use localStorage**: Store data locally, no server needed
- **Icons Matter**: Use high-quality source icons (1024x1024)
- **Clear Cache**: Clear browser cache when testing PWA features

## Advanced: Adding More Plugins

Edit `build-config.json` to enable more Capacitor plugins:

```json
"plugins": {
  "camera": { "enabled": true },
  "notifications": { "enabled": true }
}
```

Available plugins:
- Camera
- Local Notifications
- Filesystem
- Geolocation
- Device
- And many more...

See: https://capacitorjs.com/docs/plugins

## Going Further

### Sign Your APK for Play Store

1. Generate signing key
2. Configure signing in `android/app/build.gradle`
3. Build release APK: `cd android && ./gradlew assembleRelease`

### Add More Features

- Add database with IndexedDB
- Implement routing for multi-page apps
- Add authentication with localStorage
- Integrate APIs and fetch data

## Support

If you encounter issues:

1. Check the error messages carefully
2. Verify Android SDK is installed
3. Ensure all dependencies are installed: `npm install`
4. Try cleaning and rebuilding: `npm run clean`

## License

MIT - Use this template for any project!

---

**Happy Building! 🚀**
