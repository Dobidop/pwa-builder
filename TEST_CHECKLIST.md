# PWA Builder - Testing Checklist

Use this checklist to verify everything works before using in production.

## Phase 1: Project Creation Test

### Test 1: Create a Test Project

```bash
cd C:\Project\pwa-builder
node create-pwa-app.js
```

**Input:**
- Project name: `test-app`
- App display name: `Test App`
- App ID: `com.test.app`
- Description: `Testing PWA Builder`

**Expected:**
- [ ] Script runs without errors
- [ ] Creates `test-app` directory
- [ ] Copies all template files
- [ ] Updates `build-config.json` with provided values
- [ ] Updates `package.json` name
- [ ] Updates `manifest.json`
- [ ] Updates `index.html` title

**Verify files exist:**
```bash
cd test-app
ls
```
Should see: `build-config.json`, `build-app.js`, `icon-generator.js`, `package.json`, `index.html`, etc.

---

## Phase 2: Dependency Installation

```bash
cd test-app
npm install
```

**Expected:**
- [ ] Installs without errors
- [ ] Creates `node_modules` folder
- [ ] Installs @capacitor packages
- [ ] Installs sharp (for icons)

**Time:** ~1-2 minutes

---

## Phase 3: Development Server Test

```bash
npm run serve
```

**Expected:**
- [ ] Starts server on port 8000
- [ ] No errors in console
- [ ] Visit http://localhost:8000
- [ ] See "Welcome to Test App" page
- [ ] Click "Click Me!" button
- [ ] See success message
- [ ] Check browser console for "PWA App initialized"

**Stop server:** Ctrl+C

---

## Phase 4: Icon Generation Test (Optional)

**Create a test icon:**
1. Create a simple 512x512 PNG image
2. Save as `source-icon.png` in project root

```bash
npm run generate-icons
```

**Expected:**
- [ ] Runs without errors
- [ ] Creates `icons/` folder
- [ ] Generates icons: 72, 96, 128, 144, 152, 192, 384, 512
- [ ] Creates `android-icons/` folder
- [ ] Updates `manifest.json` with icon references

**Verify:**
```bash
ls icons
ls android-icons
```

---

## Phase 5: APK Build Test

**IMPORTANT:** Ensure Android SDK is installed first!

```bash
npm run build
```

**Expected Progress:**
- [ ] 🗑️ Cleaning generated folders
- [ ] 📦 Preparing web assets (copies files)
- [ ] ⚙️ Generating Capacitor configuration
- [ ] 📱 Setting up Android platform
- [ ] 🔄 Syncing with Capacitor
- [ ] ⚙️ Configuring Gradle for Java 11+
- [ ] 🔧 Configuring Android SDK
- [ ] 📱 Configuring MainActivity
- [ ] 🛑 Stopping Gradle daemons
- [ ] 🏗️ Building debug APK
- [ ] 🎉 Build complete!

**Time:** First build: 2-5 minutes, subsequent: ~1 minute

**Verify APK exists:**
```bash
ls android/app/build/outputs/apk/debug/app-debug.apk
```

**File should exist and be ~2-5 MB**

---

## Phase 6: APK Installation Test

### Option A: Install via ADB

```bash
adb devices  # Check device is connected
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Expected:**
- [ ] Installs successfully
- [ ] No errors

### Option B: Manual Install

1. Copy `app-debug.apk` to phone
2. Open file on phone
3. Allow unknown sources if prompted
4. Install

**Expected:**
- [ ] App installs
- [ ] App appears in app drawer
- [ ] App icon shows correctly (if custom icon generated)

---

## Phase 7: App Functionality Test

**On Android device:**

1. **Launch App**
   - [ ] App opens without crash
   - [ ] See "Welcome to Test App"
   - [ ] UI renders correctly

2. **Test Interactivity**
   - [ ] Click "Click Me!" button
   - [ ] See success message
   - [ ] Click again
   - [ ] See click counter increment

3. **Test Offline**
   - [ ] Enable airplane mode
   - [ ] Close and reopen app
   - [ ] App still works
   - [ ] Click counter persists

4. **Test Data Persistence**
   - [ ] Click button multiple times
   - [ ] Note the count
   - [ ] Force close app
   - [ ] Reopen app
   - [ ] Count should be same (localStorage works)

---

## Phase 8: Camera Test (If Enabled)

**Edit `build-config.json`:**
```json
{
  "plugins": {
    "camera": {
      "enabled": true
    }
  }
}
```

**Add camera button to `index.html`:**
```html
<button onclick="window.PWA.takePhoto()">Take Photo</button>
```

**Rebuild and install:**
```bash
npm run build
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

**On device:**
- [ ] Click "Take Photo"
- [ ] Camera opens
- [ ] Take photo
- [ ] Photo captured (check console in Chrome DevTools)

---

## Phase 9: Notification Test (If Enabled)

**Add notification button to `index.html`:**
```html
<button onclick="window.PWA.showNotification('Test', 'Hello!')">Test Notification</button>
```

**Rebuild and install:**
```bash
npm run build
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

**On device:**
- [ ] Click "Test Notification"
- [ ] Notification appears after 1 second
- [ ] Notification shows correct text

---

## Phase 10: Configuration Changes Test

**Edit `build-config.json`:**
```json
{
  "appName": "Updated Test App",
  "backgroundColor": "#ff0000",
  "themeColor": "#00ff00"
}
```

**Rebuild:**
```bash
npm run build
```

**Expected:**
- [ ] Build succeeds
- [ ] App name updated in Android manifest
- [ ] Theme colors applied

---

## Phase 11: Multiple Projects Test

**Create a second project:**
```bash
cd C:\Project\pwa-builder
node create-pwa-app.js
```

**Input:**
- Project name: `test-app-2`
- Different details

**Expected:**
- [ ] Creates new project successfully
- [ ] Doesn't interfere with first project
- [ ] Both projects work independently

---

## Common Issues Checklist

### Build Fails - Android SDK Not Found

**Verify SDK location:**
```bash
ls "C:\Users\<YourUsername>\AppData\Local\Android\Sdk"
```

**Should contain:**
- `build-tools/`
- `platform-tools/`
- `platforms/`

**Fix:** Install Android Studio and SDK

### Build Fails - Java Version

**Check Java:**
```bash
java -version
```

**Should be:** Java 11 or higher

**Fix:** Install Java JDK or use Android Studio's bundled JDK

### Icons Don't Generate

**Error:** `sharp not installed`

**Fix:**
```bash
npm install sharp
```

### APK Won't Install

**Check:**
- [ ] Enable "Install from Unknown Sources"
- [ ] Uninstall old version first
- [ ] APK file not corrupted (check size)

---

## Success Criteria

All tests pass when:
- ✅ Project creates successfully
- ✅ Dependencies install without errors
- ✅ Dev server runs
- ✅ APK builds successfully
- ✅ APK installs on Android device
- ✅ App launches and runs correctly
- ✅ Data persists (localStorage)
- ✅ Offline functionality works
- ✅ Optional: Camera works
- ✅ Optional: Notifications work

---

## Test Results Template

**Date:** __________
**Tester:** __________
**System:** Windows/Mac/Linux
**Android SDK:** Installed ☐ Not Installed ☐
**Android Device:** __________

**Results:**

| Test | Pass | Fail | Notes |
|------|------|------|-------|
| Project Creation | ☐ | ☐ | |
| Dependencies Install | ☐ | ☐ | |
| Dev Server | ☐ | ☐ | |
| Icon Generation | ☐ | ☐ | |
| APK Build | ☐ | ☐ | |
| APK Install | ☐ | ☐ | |
| App Launch | ☐ | ☐ | |
| Offline Mode | ☐ | ☐ | |
| Data Persistence | ☐ | ☐ | |
| Camera (optional) | ☐ | ☐ | |
| Notifications (optional) | ☐ | ☐ | |

**Overall:** PASS ☐ FAIL ☐

**Notes:**
________________________________
________________________________
________________________________

---

**Ready to test? Start with Phase 1! 🚀**
