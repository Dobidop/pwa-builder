# 🚀 Get Started with PWA Builder

Your PWA-to-APK builder is ready! Here's how to use it.

## What You Have

A complete tool that transforms web apps into standalone Android applications with minimal effort.

**Location:** `/path/to/pwa-builder`

## Quick Start (5 Minutes)

### 1. Create Your First App

```bash
cd /path/to/pwa-builder
node create-pwa-app.js
```

**Answer the prompts:**
- Project name: `my-first-app`
- App display name: `My First App`
- App ID: `com.yourname.firstapp`
- Description: `My first standalone app`

This creates a new project in `/path/to/pwa-builder/my-first-app`

### 2. Install Dependencies

```bash
cd my-first-app
npm install
```

Wait ~1-2 minutes while dependencies install.

### 3. Test in Browser

```bash
npm run serve
```

Open http://localhost:8000 in your browser. You'll see a working app!

### 4. Build APK

```bash
npm run build
```

Your APK will be created at:
```
my-first-app/android/app/build/outputs/apk/debug/app-debug.apk
```

### 5. Install on Your Phone

**Option A - Using ADB:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Option B - Manual:**
1. Copy the APK file to your phone
2. Open it on your phone
3. Allow installation from unknown sources
4. Install!

## Project Structure

```
/path/to/pwa-builder/
│
├── create-pwa-app.js           ← Run this to create new projects
├── README.md                   ← Full documentation
├── QUICKSTART.md               ← 5-minute guide
├── USAGE_EXAMPLES.md           ← Real app examples
├── TEST_CHECKLIST.md           ← Testing guide
├── PROJECT_SUMMARY.md          ← Technical overview
│
└── template/                   ← Template for new projects
    └── ... (don't modify directly)
```

## How to Build Apps

### Step 1: Create Project
```bash
node create-pwa-app.js
```

### Step 2: Customize
Edit files in your new project:
- `build-config.json` - App configuration
- `index.html` - Your HTML
- `js/app.js` - Your JavaScript
- `styles/main.css` - Your CSS

### Step 3: Test
```bash
npm run serve
```

### Step 4: Build
```bash
npm run build
```

### Step 5: Deploy
Install APK on Android device

## Customization Examples

### Change App Name & ID

Edit `build-config.json`:
```json
{
  "appName": "Cool App",
  "appId": "com.myname.coolapp"
}
```

### Add Custom Icon

1. Create/find a PNG icon (1024x1024 recommended)
2. Save as `source-icon.png` in project root
3. Run: `npm run generate-icons`
4. Rebuild: `npm run build`

### Enable Camera

Edit `build-config.json`:
```json
{
  "plugins": {
    "camera": {
      "enabled": true
    }
  }
}
```

Use in JavaScript:
```javascript
async function takePhoto() {
    const image = await Capacitor.Plugins.Camera.getPhoto({
        quality: 90,
        resultType: 'DataUrl'
    });
    console.log(image.dataUrl);
}
```

### Enable Notifications

Edit `build-config.json`:
```json
{
  "plugins": {
    "notifications": {
      "enabled": true
    }
  }
}
```

Use in JavaScript:
```javascript
window.PWA.showNotification('Title', 'Message');
```

## Available Commands (in created projects)

```bash
npm run serve           # Start dev server
npm run generate-icons  # Generate icons
npm run build          # Build APK
npm run clean          # Clean rebuild
```

## Documentation

📖 **Full Documentation:**
- [README.md](README.md) - Complete guide
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) - App examples
- [TEST_CHECKLIST.md](TEST_CHECKLIST.md) - Testing guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical details

📂 **Template Documentation:**
- [template/README.md](template/README.md) - Template guide

## App Ideas to Build

Here are some ideas to get started:

### Beginner
1. **Counter App** - Simple click counter with localStorage
2. **Note Taker** - Text notes saved locally
3. **Color Picker** - Random color generator

### Intermediate
4. **Todo List** - Task manager with categories
5. **Expense Tracker** - Track daily expenses
6. **Timer/Stopwatch** - Simple timer app
7. **Quote of the Day** - Display random quotes

### Advanced
8. **Photo Diary** - Capture and annotate photos (uses camera)
9. **Habit Tracker** - Daily habit tracking with streaks
10. **Quiz App** - Educational quiz with scoring
11. **Recipe Book** - Store and search recipes
12. **Workout Logger** - Track workouts and progress

See [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) for code examples!

## Requirements

Before building APKs, ensure you have:

1. ✅ **Node.js** (v14+)
   - Download: https://nodejs.org/

2. ✅ **Android Studio** (for Android SDK)
   - Download: https://developer.android.com/studio
   - Install Android SDK through Android Studio
   - Default location: `C:\Users\<You>\AppData\Local\Android\Sdk`

3. ✅ **Java JDK 11+**
   - Usually bundled with Android Studio
   - Location: `C:\Program Files\Android\Android Studio\jbr`

The build script auto-detects these. If missing, it will show helpful error messages.

## Troubleshooting

### "Android SDK not found"
- Install Android Studio
- Open Android Studio → Settings → Android SDK
- Install SDK

### "sharp not installed" (icon generation)
```bash
npm install sharp
```

### Build is slow
- First build: 2-5 minutes (downloads dependencies)
- Subsequent builds: ~1 minute

### APK won't install
- Enable "Unknown Sources" in Android settings
- Uninstall old version first
- Use `adb install -r` to replace existing

## Next Steps

1. ✅ **Test the tool** - Create a test project and build it
2. ✅ **Build your first real app** - Use the examples for inspiration
3. ✅ **Share it** - Install on your phone and show friends!
4. ✅ **Build more apps** - No limits on projects

## Tips for Success

- 💡 **Start simple** - Use the template as-is first
- 💡 **Test in browser** - Much faster than building APK
- 💡 **Use localStorage** - No backend needed
- 💡 **Read examples** - Learn from working code
- 💡 **Iterate quickly** - Test → Edit → Rebuild

## Support

If you encounter issues:

1. Check [TEST_CHECKLIST.md](TEST_CHECKLIST.md)
2. Verify Android SDK is installed
3. Check error messages carefully
4. Try `npm run clean` and rebuild

---

## Ready to Build? 🎯

```bash
# Create your first app now!
cd /path/to/pwa-builder
node create-pwa-app.js
```

**Happy Building! 🚀**

---

**Questions?** Check the documentation files listed above.
