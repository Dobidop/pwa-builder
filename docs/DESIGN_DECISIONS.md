# PWA Builder - Design Decisions

This document explains key architectural and scope decisions made during development.

## Core Philosophy

**Make simple things simple, and complex things possible.**

The builder should help beginners create standalone apps quickly, while providing infrastructure for advanced features when needed.

---

## Decision 1: Plugins Disabled by Default

### Question
Should camera and notifications be enabled by default?

### Decision
**NO - Disabled by default** ✅

### Reasoning

**Pros of disabled:**
1. **Simplicity** - New users get clean, working app immediately
2. **No permissions** - Avoids Android permission complexity
3. **Smaller learning curve** - Focus on basics first
4. **Clear scope** - This is a PWA builder, not a plugin framework
5. **Less confusion** - Users won't wonder why features aren't working

**Cons of disabled:**
- Users need to enable manually (but it's just a config toggle)
- Example code might not work out-of-box (but we include clear warnings)

**Comparison to alternatives:**
- React Native/Flutter: Plugins always manual
- Cordova: Plugins always manual
- PWA Builder: Infrastructure ready, one-click enable ✅

### Implementation
- Plugins disabled in `build-config.json`
- Example code included with warnings
- Clear documentation in [PLUGINS_GUIDE.md](PLUGINS_GUIDE.md)
- Easy opt-in: just change `"enabled": true`

---

## Decision 2: Include Plugin Infrastructure

### Question
Should we include plugin dependencies and code at all, or make it completely opt-in?

### Decision
**Include infrastructure, but keep it simple** ✅

### What We Include:
- ✅ Plugin dependencies in package.json (user doesn't need to add)
- ✅ Plugin registration in build-app.js (auto-configures when enabled)
- ✅ Example helper functions (window.PWA.takePhoto, etc.)
- ✅ Documentation links to official Capacitor docs

### What We DON'T Include:
- ❌ Complex permission handling code
- ❌ Notification channels setup
- ❌ Advanced error recovery
- ❌ Platform-specific customizations
- ❌ Multiple notification types

### Reasoning
The infrastructure (Capacitor plugin system) is proven and works. The *implementation details* are app-specific and should be left to the developer.

**Analogy:**
- We provide a car with a radio installed (infrastructure)
- We don't pre-program your favorite stations (implementation)
- We show you how to use the radio (documentation)
- You choose if you want to turn it on (config toggle)

---

## Decision 3: Configuration Over Code

### Question
Should users edit build scripts or use config files?

### Decision
**JSON configuration files** ✅

### Reasoning
- **Accessible** - JSON is easier than JavaScript for beginners
- **Declarative** - "What" not "how"
- **Safe** - Can't break build script syntax
- **Portable** - Easy to share configs between projects
- **Familiar** - Similar to package.json, manifest.json

### Example
Instead of editing `build-app.js`:
```javascript
const appName = "My App"; // Users would edit this
```

Users edit `build-config.json`:
```json
{
  "appName": "My App"
}
```

Much safer and clearer!

---

## Decision 4: Scope Boundaries

### Question
What should be in-scope vs. out-of-scope?

### In-Scope ✅
- Project scaffolding
- Basic PWA setup (manifest, service worker)
- APK build automation
- Icon generation
- Plugin infrastructure
- Basic example code
- Clear documentation

### Out-of-Scope ❌
- Advanced notification systems
- Complex permission flows
- Backend integration
- State management libraries
- UI component frameworks
- Database integrations
- App store deployment
- Signing/release builds (maybe add later)

### Reasoning
This is a **builder tool**, not a **framework**.

**Good analogy:**
- `create-react-app`: Scaffolds React, doesn't include Redux/routing/forms
- `pwa-builder`: Scaffolds PWA, doesn't include notifications/database/auth

Users can add what they need.

---

## Decision 5: Documentation Strategy

### Question
How much documentation is enough?

### Decision
**Comprehensive but layered** ✅

### Structure
1. **GET_STARTED.md** - 5-minute quickstart
2. **QUICKSTART.md** - Detailed first app guide
3. **README.md** - Complete reference
4. **USAGE_EXAMPLES.md** - Real app examples
5. **PLUGINS_GUIDE.md** - Plugin details (NEW)
6. **TEST_CHECKLIST.md** - Testing guide
7. **PROJECT_SUMMARY.md** - Technical overview
8. **DESIGN_DECISIONS.md** - This file

### Reasoning
Different users need different detail levels:
- Impatient: GET_STARTED.md → done in 5 min
- Learners: QUICKSTART.md → step-by-step
- Reference: README.md → complete docs
- Implementers: USAGE_EXAMPLES.md → copy-paste code

---

## Decision 6: Template Minimalism

### Question
Should the template include a fancy UI framework or starter components?

### Decision
**Vanilla HTML/CSS/JS** ✅

### What Template Includes:
- Clean, responsive design
- Modern CSS (CSS variables, flexbox)
- Working service worker
- Example localStorage usage
- Mobile-first approach

### What Template Excludes:
- React/Vue/Svelte
- CSS frameworks (Bootstrap, Tailwind)
- Build tools (Webpack, Vite)
- Testing frameworks
- Linting/formatting tools

### Reasoning
1. **Universal** - Everyone knows HTML/CSS/JS
2. **No lock-in** - Users can add any framework
3. **Lightweight** - Fast builds, small APKs
4. **Educational** - Learn the fundamentals
5. **Flexible** - Easy to modify/replace

Users who want React can add it. Users who want vanilla get it immediately.

---

## Decision 7: Error Handling Strategy

### Question
How much error handling should be built-in?

### Decision
**Helpful failures over silent errors** ✅

### Implementation
- Build script shows clear error messages
- Auto-detects common issues (SDK missing, Java missing)
- Provides fix suggestions in errors
- Links to documentation when relevant
- Example code logs to console

### Example
Instead of:
```
Error: Command failed
```

We show:
```
❌ Android SDK not found
💡 Install Android Studio from: https://developer.android.com/studio
💡 Common locations:
   - C:\Users\<You>\AppData\Local\Android\Sdk
   - ~/Library/Android/sdk
```

Much more helpful for beginners!

---

## Decision 8: Multi-Platform Support

### Question
Should the builder work on Windows, Mac, and Linux?

### Decision
**Yes, but Windows-first** ✅

### Implementation
- Build script detects platform
- Auto-finds SDK/Java on common paths for all OS
- Platform-specific commands (gradlew.bat vs ./gradlew)
- Tested primarily on Windows (CleanQuest reference)

### Reasoning
Based on CleanQuest which is Windows-based, but made portable for future users.

---

## Lessons from CleanQuest

Your CleanQuest project taught us:

1. ✅ **Capacitor works great** for web-to-APK
2. ✅ **Automation is crucial** (build-clean.js proved this)
3. ✅ **Auto-detection helps** (SDK paths, Java paths)
4. ✅ **Notifications are complex** (better as opt-in)
5. ✅ **Config files > hardcoded values**

---

## Future Considerations

### Might Add Later:
- iOS support (Capacitor already supports it)
- Release build signing
- Cloud build service
- Visual config UI
- Template marketplace
- More plugin presets

### Won't Add:
- Backend/server integration (out of scope)
- Complex frameworks (user choice)
- App store submission (separate concern)
- Paid features (keep it free)

---

## Conclusion

**The PWA Builder prioritizes:**
1. **Simplicity** - Easy for beginners
2. **Flexibility** - Powerful for advanced users
3. **Clarity** - Clear documentation and errors
4. **Proven tech** - Based on working CleanQuest setup
5. **Reasonable scope** - Builder tool, not framework

**Result:** A tool that does one thing well - turns web apps into APKs.

---

*These decisions can evolve based on user feedback and real-world usage.*
