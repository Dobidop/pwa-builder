#!/usr/bin/env node

/**
 * PWA Builder - Smart Build Script
 * Builds standalone APK from web app using configuration file
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

console.log('🚀 PWA Builder - Starting build process...\n');

// Load configuration
let config;
try {
    const configFile = fs.readFileSync('build-config.json', 'utf8');
    config = JSON.parse(configFile);
    console.log(`📋 Configuration loaded for: ${config.appName}`);
} catch (error) {
    console.error('❌ Error: build-config.json not found or invalid');
    console.error('💡 Make sure build-config.json exists in the project root');
    process.exit(1);
}

// Step 1: Clean existing generated folders
console.log('\n🗑️  Cleaning generated folders...');
try {
    if (fs.existsSync(config.webDir || 'www')) {
        fs.rmSync(config.webDir || 'www', { recursive: true, force: true });
        console.log(`   ✅ Removed ${config.webDir || 'www'}/`);
    }
    if (fs.existsSync('android')) {
        fs.rmSync('android', { recursive: true, force: true });
        console.log('   ✅ Removed android/');
    }
} catch (error) {
    console.log('   ⚠️  Clean warning:', error.message);
}

// Step 2: Create www directory and copy files
console.log('\n📦 Preparing web assets...');
const webDir = config.webDir || 'www';
if (!fs.existsSync(webDir)) {
    fs.mkdirSync(webDir, { recursive: true });
}

// Copy individual files
const filesToCopy = config.filesToCopy || ['index.html', 'manifest.json', 'sw.js'];
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(webDir, file));
        console.log(`   ✅ Copied ${file}`);
    } else {
        console.log(`   ⚠️  Missing ${file} (skipping)`);
    }
});

// Copy folders recursively
const foldersToCopy = config.foldersToCopy || ['js', 'styles', 'icons', 'assets'];
foldersToCopy.forEach(folder => {
    if (fs.existsSync(folder)) {
        copyFolderRecursive(folder, path.join(webDir, folder));
        console.log(`   ✅ Copied ${folder}/`);
    } else {
        console.log(`   ⚠️  Missing ${folder}/ (skipping)`);
    }
});

function copyFolderRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
            copyFolderRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Step 3: Generate capacitor.config.ts from template
console.log('\n⚙️  Generating Capacitor configuration...');
try {
    const capacitorConfig = `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: '${config.appId}',
  appName: '${config.appName}',
  webDir: '${config.webDir || 'www'}',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: ${config.android?.allowMixedContent || true},
    backgroundColor: '${config.backgroundColor || '#ffffff'}',
    webContentsDebuggingEnabled: ${config.android?.webContentsDebuggingEnabled || true}
  }${config.plugins?.notifications?.enabled ? `,
  plugins: {
    LocalNotifications: {
      smallIcon: '${config.plugins.notifications.smallIcon || 'ic_stat_notification'}',
      iconColor: '${config.plugins.notifications.iconColor || '#4CAF50'}',
      sound: '${config.plugins.notifications.sound || 'notification_sound.wav'}',
      requestPermissions: true,
      alwaysShowNotification: false,
      autoCancel: true
    }
  }` : ''}
};

export default config;
`;
    fs.writeFileSync('capacitor.config.ts', capacitorConfig);
    console.log('   ✅ capacitor.config.ts generated');
} catch (error) {
    console.error('   ❌ Failed to generate Capacitor config:', error.message);
    process.exit(1);
}

// Step 4: Add Android platform
console.log('\n📱 Setting up Android platform...');
try {
    execSync('npx cap add android', { stdio: 'inherit' });
    console.log('   ✅ Android platform added');
} catch (error) {
    console.log('   ⚠️  Android platform already exists or error:', error.message);
}

// Step 5: Sync with Capacitor
console.log('\n🔄 Syncing with Capacitor...');
try {
    execSync('npx cap sync android', { stdio: 'inherit' });
    console.log('   ✅ Capacitor sync complete');
} catch (error) {
    console.error('   ❌ Sync failed:', error.message);
    process.exit(1);
}

// Step 6: Configure Gradle for Java
console.log('\n⚙️  Configuring Gradle for Java 11+...');
const gradlePropsPath = path.join('android', 'gradle.properties');
try {
    let gradleProps = fs.readFileSync(gradlePropsPath, 'utf8');

    // Detect Java path
    const javaHomePaths = [
        'C:\\Program Files\\Android\\Android Studio\\jbr',
        'C:\\Program Files\\Java\\jdk-17',
        'C:\\Program Files\\Java\\jdk-11',
        '/usr/lib/jvm/java-17-openjdk-amd64',
        '/usr/lib/jvm/java-11-openjdk-amd64'
    ];

    let javaHome = null;
    for (const testPath of javaHomePaths) {
        if (fs.existsSync(testPath)) {
            javaHome = testPath;
            break;
        }
    }

    if (!gradleProps.includes('org.gradle.java.home') && javaHome) {
        gradleProps += '\n# Set correct Java home for Android Gradle Plugin compatibility\n';
        gradleProps += `org.gradle.java.home=${javaHome.replace(/\\/g, '\\\\')}\n`;
        fs.writeFileSync(gradlePropsPath, gradleProps);
        console.log(`   ✅ Added Java home: ${javaHome}`);
    } else {
        console.log('   ✅ Java home already configured');
    }
} catch (error) {
    console.error('   ⚠️  Could not configure gradle.properties:', error.message);
}

// Step 7: Configure Android SDK
console.log('\n🔧 Configuring Android SDK...');
const localPropsPath = path.join('android', 'local.properties');
try {
    const username = os.userInfo().username;
    const possibleSdkPaths = [
        `C:\\Users\\${username}\\AppData\\Local\\Android\\Sdk`,
        'C:\\Android\\Sdk',
        'C:\\Program Files\\Android\\Sdk',
        'C:\\Program Files (x86)\\Android\\Sdk',
        `/Users/${username}/Library/Android/sdk`,
        '/home/' + username + '/Android/Sdk'
    ];

    let sdkPath = null;

    for (const testPath of possibleSdkPaths) {
        if (fs.existsSync(testPath)) {
            sdkPath = testPath;
            break;
        }
    }

    if (sdkPath) {
        const localProps = `# This file was automatically generated by build-app.js
# Do not modify this file -- YOUR CHANGES WILL BE ERASED!
# This file should *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.

# Location of the SDK. This is only used by Gradle.
sdk.dir=${sdkPath.replace(/\\/g, '\\\\')}
`;
        fs.writeFileSync(localPropsPath, localProps);
        console.log(`   ✅ Android SDK configured: ${sdkPath}`);
    } else {
        console.error('   ❌ Android SDK not found. Please install Android Studio and SDK.');
        console.error('   💡 Common locations:');
        possibleSdkPaths.forEach(p => console.error(`      - ${p}`));
        console.error('\n   💡 Install Android Studio from: https://developer.android.com/studio');
    }
} catch (error) {
    console.error('   ⚠️  Could not configure Android SDK:', error.message);
}

// Step 8: Configure MainActivity
console.log('\n📱 Configuring MainActivity...');
const packagePath = config.appId.replace(/\./g, '/');
const mainActivityPath = path.join('android', 'app', 'src', 'main', 'java', packagePath, 'MainActivity.java');
try {
    const plugins = [];

    if (config.plugins?.notifications?.enabled) {
        plugins.push('import com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin;');
        plugins.push('        registerPlugin(LocalNotificationsPlugin.class);');
    }

    if (config.plugins?.camera?.enabled) {
        plugins.push('import com.capacitorjs.plugins.camera.CameraPlugin;');
        plugins.push('        registerPlugin(CameraPlugin.class);');
    }

    const mainActivity = `package ${config.appId};

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
${plugins.filter(p => p.startsWith('import')).join('\n')}

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

${plugins.filter(p => !p.startsWith('import')).join('\n')}
    }
}`;

    fs.writeFileSync(mainActivityPath, mainActivity);
    console.log('   ✅ MainActivity configured with plugins');
} catch (error) {
    console.error('   ⚠️  Could not configure MainActivity:', error.message);
}

// Step 9: Build APK
console.log('\n🏗️  Building APK...');
try {
    console.log('   🛑 Stopping Gradle daemons...');
    const stopCommand = process.platform === 'win32'
        ? 'cd android && gradlew.bat --stop'
        : 'cd android && ./gradlew --stop';
    execSync(stopCommand, { stdio: 'pipe' });

    console.log('   🏗️  Building debug APK...');
    const buildCommand = process.platform === 'win32'
        ? 'cd android && gradlew.bat assembleDebug'
        : 'cd android && ./gradlew assembleDebug';

    execSync(buildCommand, { stdio: 'inherit' });
    console.log('   ✅ APK build complete');
} catch (error) {
    console.error('   ❌ APK build failed:', error.message);
    console.error('   💡 Try running: cd android && gradlew.bat --stop && gradlew.bat assembleDebug');
    process.exit(1);
}

console.log('\n🎉 Build complete!');
console.log(`📱 APK location: android/app/build/outputs/apk/debug/app-debug.apk`);
console.log(`\n💡 To install on your device:`);
console.log(`   adb install android/app/build/outputs/apk/debug/app-debug.apk`);
