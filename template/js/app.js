// PWA Builder - Main Application Script

console.log('PWA App initialized');

// Example: Button click handler
document.addEventListener('DOMContentLoaded', () => {
    const testBtn = document.getElementById('testBtn');
    const output = document.getElementById('output');

    if (testBtn && output) {
        testBtn.addEventListener('click', () => {
            output.textContent = '🎉 Your PWA is working!';

            // Example of using localStorage
            const clicks = parseInt(localStorage.getItem('clicks') || '0') + 1;
            localStorage.setItem('clicks', clicks.toString());

            setTimeout(() => {
                output.textContent = `Total clicks: ${clicks}`;
            }, 1000);
        });
    }

    // Check if running in Capacitor (native app)
    if (window.Capacitor) {
        console.log('Running in native app mode');
        document.body.classList.add('native-app');
    } else {
        console.log('Running in browser mode');
    }
});

// Example: Camera functionality (if camera plugin is enabled)
async function takePhoto() {
    if (window.Capacitor && window.Capacitor.Plugins.Camera) {
        try {
            const image = await Capacitor.Plugins.Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: 'DataUrl'
            });

            console.log('Photo captured:', image);
            return image.dataUrl;
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    } else {
        console.warn('Camera not available');
    }
}

// Example: Local notification (if notifications plugin is enabled)
async function showNotification(title, body) {
    if (window.Capacitor && window.Capacitor.Plugins.LocalNotifications) {
        try {
            await Capacitor.Plugins.LocalNotifications.schedule({
                notifications: [
                    {
                        title: title,
                        body: body,
                        id: Date.now(),
                        schedule: { at: new Date(Date.now() + 1000) }
                    }
                ]
            });
            console.log('Notification scheduled');
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    } else {
        console.warn('Notifications not available');
    }
}

// Export functions for use in other scripts
window.PWA = {
    takePhoto,
    showNotification
};
