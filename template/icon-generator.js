#!/usr/bin/env node

/**
 * PWA Builder - Icon Generator
 * Generates all required icon sizes from a single source image
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 PWA Builder - Icon Generator\n');

// Load configuration
let config;
try {
    const configFile = fs.readFileSync('build-config.json', 'utf8');
    config = JSON.parse(configFile);
} catch (error) {
    console.error('❌ Error: build-config.json not found or invalid');
    process.exit(1);
}

const sourceIcon = config.sourceIcon || 'source-icon.png';

if (!fs.existsSync(sourceIcon)) {
    console.error(`❌ Error: Source icon not found: ${sourceIcon}`);
    console.error('💡 Please provide a PNG image (recommended: 1024x1024 or larger)');
    console.error('   Update "sourceIcon" in build-config.json or place source-icon.png in project root');
    process.exit(1);
}

console.log(`📷 Source icon: ${sourceIcon}`);

// Check if sharp is available
let sharp;
try {
    sharp = require('sharp');
} catch (error) {
    console.error('❌ Error: "sharp" package not installed');
    console.error('💡 Install it with: npm install sharp');
    process.exit(1);
}

// Icon sizes needed for PWA and Android
const iconSizes = {
    pwa: [72, 96, 128, 144, 152, 192, 384, 512],
    android: {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192
    }
};

async function generateIcons() {
    try {
        // Create icons directory if it doesn't exist
        if (!fs.existsSync('icons')) {
            fs.mkdirSync('icons', { recursive: true });
        }

        console.log('\n📱 Generating PWA icons...');

        // Generate PWA icons
        for (const size of iconSizes.pwa) {
            const outputPath = path.join('icons', `icon-${size}x${size}.png`);
            await sharp(sourceIcon)
                .resize(size, size, {
                    fit: 'cover',
                    position: 'center'
                })
                .png()
                .toFile(outputPath);
            console.log(`   ✅ Generated ${size}x${size} icon`);
        }

        // Generate Android launcher icons
        console.log('\n🤖 Generating Android launcher icons...');
        console.log('   💡 These will be used after running "npm run build"');

        // Note: Android icons will be generated during build process
        // We'll store templates in a temp directory
        if (!fs.existsSync('android-icons')) {
            fs.mkdirSync('android-icons', { recursive: true });
        }

        for (const [folder, size] of Object.entries(iconSizes.android)) {
            const outputDir = path.join('android-icons', folder);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const iconPath = path.join(outputDir, 'ic_launcher.png');
            const roundPath = path.join(outputDir, 'ic_launcher_round.png');
            const foregroundPath = path.join(outputDir, 'ic_launcher_foreground.png');

            await sharp(sourceIcon)
                .resize(size, size, {
                    fit: 'cover',
                    position: 'center'
                })
                .png()
                .toFile(iconPath);

            await sharp(sourceIcon)
                .resize(size, size, {
                    fit: 'cover',
                    position: 'center'
                })
                .png()
                .toFile(roundPath);

            // Foreground should be slightly larger with padding
            const foregroundSize = Math.floor(size * 1.2);
            await sharp(sourceIcon)
                .resize(foregroundSize, foregroundSize, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(foregroundPath);

            console.log(`   ✅ Generated ${folder} icons`);
        }

        // Generate manifest icons
        console.log('\n📋 Updating manifest.json...');
        const manifestPath = 'manifest.json';
        let manifest;

        if (fs.existsSync(manifestPath)) {
            manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        } else {
            manifest = {
                name: config.appName,
                short_name: config.appName,
                description: config.appDescription,
                start_url: "/",
                display: "standalone",
                theme_color: config.themeColor || "#4CAF50",
                background_color: config.backgroundColor || "#ffffff"
            };
        }

        manifest.icons = iconSizes.pwa.map(size => ({
            src: `icons/icon-${size}x${size}.png`,
            sizes: `${size}x${size}`,
            type: "image/png",
            purpose: size >= 192 ? "any maskable" : "any"
        }));

        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('   ✅ manifest.json updated with icon references');

        console.log('\n🎉 Icon generation complete!');
        console.log('📁 PWA icons: icons/');
        console.log('📁 Android icons: android-icons/ (will be copied during build)');

    } catch (error) {
        console.error('❌ Error generating icons:', error.message);
        process.exit(1);
    }
}

// Run the generator
generateIcons();
