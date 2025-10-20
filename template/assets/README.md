# Assets Folder

Place your app's assets here:

- Images
- Fonts
- Audio files
- Videos
- Data files
- etc.

This folder will be automatically copied to the build during `npm run build`.

## Example Structure

```
assets/
├── images/
│   ├── logo.png
│   ├── background.jpg
│   └── icons/
├── fonts/
│   └── custom-font.ttf
├── audio/
│   └── notification.mp3
└── data/
    └── config.json
```

## Referencing Assets

In your HTML:
```html
<img src="assets/images/logo.png" alt="Logo">
```

In your CSS:
```css
background-image: url('../assets/images/background.jpg');
```

In your JavaScript:
```javascript
const data = await fetch('assets/data/config.json');
```
