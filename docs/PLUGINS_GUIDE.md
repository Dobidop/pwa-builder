# PWA Builder - Optional Plugins Guide

The template includes infrastructure for **optional plugins** (Camera and Notifications), but they are **disabled by default**.

## Philosophy

**Keep it simple by default.** Advanced features are opt-in.

### Default Setup:
- ✅ Basic PWA functionality (works offline)
- ✅ localStorage for data persistence
- ✅ Service Worker caching
- ❌ Camera (disabled)
- ❌ Notifications (disabled)

### Why Disabled by Default?
1. **Simplicity** - Most apps don't need them
2. **Permissions** - Require Android permissions setup
3. **Complexity** - Need proper error handling
4. **Learning curve** - Beginners should start simple

## Enabling Plugins

### Camera Plugin

**1. Enable in config:**

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

**2. Use in your code:**
```javascript
async function takePhoto() {
    const image = await Capacitor.Plugins.Camera.getPhoto({
        quality: 90,
        resultType: 'DataUrl'
    });
    console.log(image.dataUrl);
}
```

**3. Rebuild:**
```bash
npm run build
```

**Documentation:** https://capacitorjs.com/docs/apis/camera

---

### Notifications Plugin

**1. Enable in config:**

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

**2. Use in your code:**
```javascript
async function notify() {
    // Request permission first (required on Android 13+)
    const perm = await Capacitor.Plugins.LocalNotifications.requestPermissions();

    if (perm.display === 'granted') {
        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [{
                title: "Hello",
                body: "This is a notification",
                id: 1,
                schedule: { at: new Date(Date.now() + 1000) }
            }]
        });
    }
}
```

**3. Rebuild:**
```bash
npm run build
```

**Important Notes:**
- Requires permission request on Android 13+
- Needs notification channels on Android 8+
- May require custom notification icons for best results

**Documentation:** https://capacitorjs.com/docs/apis/local-notifications

---

## When to Use Each Plugin

### Camera Plugin - Use For:
- Photo diary apps
- Document scanning
- Profile picture uploads
- QR code scanning (with additional library)
- Before/after comparisons

### Notifications Plugin - Use For:
- Habit reminders
- Timer/alarm apps
- Task due date reminders
- Daily motivation
- Event notifications

---

## Template Helper Functions

The template includes example functions:

**Camera:**
```javascript
window.PWA.takePhoto()
```

**Notifications:**
```javascript
window.PWA.showNotification('Title', 'Message')
```

These are **examples only** - customize for your needs!

---

## Advanced: Adding More Plugins

Want to add more Capacitor plugins?

**1. Install the plugin:**
```bash
npm install @capacitor/plugin-name
```

**2. Update build-app.js:**

Find the MainActivity configuration section (around line 230) and add:
```javascript
if (config.plugins?.yourPlugin?.enabled) {
    plugins.push('import com.capacitorjs.plugins.yourplugin.YourPlugin;');
    plugins.push('        registerPlugin(YourPlugin.class);');
}
```

**3. Use in your app:**
```javascript
await Capacitor.Plugins.YourPlugin.doSomething();
```

**Available Capacitor Plugins:**
- Filesystem
- Geolocation
- Device Info
- Network
- Haptics
- Share
- And many more: https://capacitorjs.com/docs/plugins

---

## Recommendations

### For Beginners:
- ❌ **Don't** enable plugins initially
- ✅ Build a simple app first
- ✅ Master basic HTML/CSS/JS
- ✅ Use localStorage for data
- ✅ Add plugins later when needed

### For Intermediate Users:
- ✅ Enable camera for photo features
- ✅ Enable notifications for reminders
- ✅ Read Capacitor docs thoroughly
- ✅ Test permissions carefully

### For Advanced Users:
- ✅ Customize plugin configurations
- ✅ Add additional Capacitor plugins
- ✅ Handle edge cases and errors
- ✅ Implement proper permission flows

---

## The Bottom Line

**Plugins are optional infrastructure, not required features.**

The builder provides:
- ✅ Plugin registration in build script
- ✅ Example code you can learn from
- ✅ Easy enable/disable toggle
- ✅ Links to official documentation

**You provide:**
- Your specific implementation
- Error handling for your use case
- Permission request flows
- User experience design

---

## Support

For plugin-specific issues, refer to official Capacitor documentation:
- https://capacitorjs.com/docs
- https://capacitorjs.com/docs/apis

For PWA Builder issues:
- Check [README.md](template/README.md)
- Check [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)

---

**Keep it simple. Add complexity only when needed.** 🎯
