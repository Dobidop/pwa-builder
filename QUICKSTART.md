# PWA Builder - Quick Start Guide

Get your first standalone mobile app running in 5 minutes!

## Prerequisites

1. **Install Node.js**: https://nodejs.org/ (v14 or higher)
2. **Install Android Studio**: https://developer.android.com/studio
   - During installation, make sure to install Android SDK
   - Note the SDK location (usually `C:\Users\<YourName>\AppData\Local\Android\Sdk`)

## Step 1: Create Your First App (2 minutes)

Open a terminal in the `pwa-builder` directory:

```bash
cd /path/to/pwa-builder
node create-pwa-app.js
```

Answer the prompts:
```
Project name: my-first-app
App display name: My First App
App ID: com.myname.firstapp
Description: My first standalone mobile app
```

## Step 2: Install Dependencies (1 minute)

```bash
cd my-first-app
npm install
```

This installs Capacitor and all required packages.

## Step 3: Test in Browser (30 seconds)

```bash
npm run serve
```

Visit http://localhost:8000

You should see the starter app with a button. Click it to test!

## Step 4: Build Your APK (2 minutes)

```bash
npm run build
```

This will:
- ✅ Create the `www` folder with your web files
- ✅ Add Android platform
- ✅ Configure Capacitor
- ✅ Build the APK

## Step 5: Get Your APK

Your APK is ready at:
```
my-first-app/android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Your Phone

**Option 1: Using ADB**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Option 2: Manual Transfer**
1. Copy `app-debug.apk` to your phone
2. Open it on your phone
3. Allow installation from unknown sources if prompted
4. Install!

## Next Steps: Customize Your App

### Change App Name and Icon

1. **Update Configuration**
   Edit `build-config.json`:
   ```json
   {
     "appName": "Your Cool App Name",
     "appId": "com.yourname.coolapp"
   }
   ```

2. **Add Your Icon**
   - Find a PNG image (1024x1024 recommended)
   - Save it as `source-icon.png` in your project root
   - Run: `npm run generate-icons`
   - Rebuild: `npm run build`

### Edit Your App

**HTML** (`index.html`):
```html
<h1>My Custom App</h1>
<button id="myButton">Click Me!</button>
```

**JavaScript** (`js/app.js`):
```javascript
document.getElementById('myButton').addEventListener('click', () => {
    alert('Hello from my app!');
});
```

**CSS** (`styles/main.css`):
```css
body {
    background: linear-gradient(to bottom, #667eea, #764ba2);
    color: white;
}
```

### Test and Rebuild

1. **Test changes**: `npm run serve`
2. **Build APK**: `npm run build`
3. **Install**: Transfer APK to phone

## Common Commands

```bash
# Start development server
npm run serve

# Generate icons from source-icon.png
npm run generate-icons

# Build APK
npm run build

# Clean and rebuild everything
npm run clean
```

## File Structure

```
my-first-app/
├── build-config.json     ← Configure your app
├── index.html            ← Your main page
├── js/
│   └── app.js            ← Your JavaScript
├── styles/
│   └── main.css          ← Your styles
├── icons/                ← Generated icons
└── source-icon.png       ← Your app icon
```

## Troubleshooting

### "Android SDK not found"
- Make sure Android Studio is installed
- Check SDK location: Android Studio → Settings → Android SDK
- Default: `C:\Users\<You>\AppData\Local\Android\Sdk`

### "sharp not installed" (icon generation)
```bash
npm install sharp
```

### Build is slow
- First build takes 2-5 minutes (downloads dependencies)
- Subsequent builds are faster (~1 minute)

### App doesn't install on phone
- Enable "Install from Unknown Sources" in Android settings
- Try using `adb install` command
- Check app isn't already installed

## Tips for Success

1. **Start with the template** - Don't modify files you don't understand
2. **Test in browser first** - Much faster than building APK
3. **Use localStorage** - Store data locally, no backend needed
4. **Keep it simple** - Start basic, add features gradually
5. **Clear cache** - Use Ctrl+Shift+R in browser to hard refresh

## Example: Build a Counter App (5 minutes)

**1. Edit `index.html`:**
```html
<main>
    <h1 id="counter">0</h1>
    <button id="increment">+</button>
    <button id="decrement">-</button>
    <button id="reset">Reset</button>
</main>
```

**2. Edit `js/app.js`:**
```javascript
let count = parseInt(localStorage.getItem('count') || '0');

document.getElementById('counter').textContent = count;

document.getElementById('increment').addEventListener('click', () => {
    count++;
    update();
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    update();
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    update();
});

function update() {
    document.getElementById('counter').textContent = count;
    localStorage.setItem('count', count);
}
```

**3. Build and install:**
```bash
npm run build
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Done! You now have a working counter app on your phone!

## What's Next?

- Add camera functionality (already configured!)
- Add notifications (already configured!)
- Build a todo app
- Build a note-taking app
- Build a game
- Build anything you want!

Check the main [README.md](template/README.md) in the template folder for advanced features.

---

**You're all set! Start building! 🚀**
