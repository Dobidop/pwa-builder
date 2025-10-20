#!/usr/bin/env node

/**
 * PWA Builder - Project Creator
 * Creates a new PWA project from template
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createProject() {
    console.log('\n🚀 PWA Builder - Create New Project\n');

    // Get project details
    const projectName = await question('Project name (my-pwa-app): ') || 'my-pwa-app';
    const appName = await question('App display name (My PWA App): ') || 'My PWA App';
    const appId = await question('App ID (com.example.myapp): ') || 'com.example.myapp';
    const description = await question('Description (A Progressive Web App): ') || 'A Progressive Web App';

    rl.close();

    console.log('\n📦 Creating project...\n');

    // Validate app ID format
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(appId)) {
        console.error('❌ Invalid App ID format. Use format like: com.yourname.appname');
        process.exit(1);
    }

    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.error(`❌ Directory "${projectName}" already exists`);
        process.exit(1);
    }

    try {
        // Create project directory
        fs.mkdirSync(projectPath, { recursive: true });
        console.log(`✅ Created directory: ${projectName}`);

        // Copy template files
        const templateDir = path.join(__dirname, 'template');

        if (!fs.existsSync(templateDir)) {
            console.error('❌ Template directory not found');
            console.error('💡 Make sure you\'re running this from the pwa-builder directory');
            process.exit(1);
        }

        copyDirectory(templateDir, projectPath);
        console.log('✅ Copied template files');

        // Update configuration
        const configPath = path.join(projectPath, 'build-config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        config.appName = appName;
        config.appId = appId;
        config.appDescription = description;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log('✅ Updated configuration');

        // Update package.json
        const packagePath = path.join(projectPath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
        packageJson.description = description;

        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Updated package.json');

        // Update manifest.json
        const manifestPath = path.join(projectPath, 'manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        manifest.name = appName;
        manifest.short_name = appName;
        manifest.description = description;

        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('✅ Updated manifest.json');

        // Update index.html title
        const indexPath = path.join(projectPath, 'index.html');
        let indexHtml = fs.readFileSync(indexPath, 'utf8');
        indexHtml = indexHtml.replace('<title>My PWA App</title>', `<title>${appName}</title>`);
        indexHtml = indexHtml.replace('<h1>Welcome to Your PWA</h1>', `<h1>Welcome to ${appName}</h1>`);
        fs.writeFileSync(indexPath, indexHtml);
        console.log('✅ Updated index.html');

        console.log('\n🎉 Project created successfully!\n');
        console.log('📁 Project location:', projectPath);
        console.log('\nNext steps:\n');
        console.log(`   cd ${projectName}`);
        console.log('   npm install');
        console.log('   npm run serve          # Start dev server');
        console.log('   npm run build          # Build APK\n');

    } catch (error) {
        console.error('❌ Error creating project:', error.message);
        process.exit(1);
    }
}

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    items.forEach(item => {
        // Skip node_modules and other build artifacts
        if (item === 'node_modules' || item === 'www' || item === 'android' || item === 'ios') {
            return;
        }

        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Run the creator
createProject();
