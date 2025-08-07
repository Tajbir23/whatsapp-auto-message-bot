const venom = require('venom-bot');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration
const targetNumber = process.env.TARGET_NUMBER || '8801304037115';
const message = process.env.MESSAGE || 'Good morning! Kemon acen ?';
const TOKEN_DIR = path.join(__dirname, 'tokens', 'whatsapp-bot');

// Initialize WhatsApp client
function start(client) {
    console.log('Bot is authenticated and ready!');
    
    // Schedule message to be sent every day at 6 AM
    cron.schedule(`${Math.floor(Math.random() * 30)} 6 * * *`, async () => {
        try {
            // Send message
            await client.sendText(`${targetNumber}@c.us`, message);
            console.log('Daily message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, {
        timezone: "Asia/Dhaka"
    });

    console.log('Bot is running! Scheduled to send messages daily at 6 AM');
}

// Check and clean tokens if needed
function cleanTokens() {
    if (fs.existsSync(TOKEN_DIR)) {
        try {
            fs.rmSync(TOKEN_DIR, { recursive: true });
            console.log('Cleaned up corrupted tokens.');
        } catch (error) {
            console.error('Error cleaning up tokens:', error);
        }
    }
}

// Create Venom Instance
async function createInstance() {
    const config = {
        session: 'whatsapp-bot',
        multidevice: true,
        headless: true,
        useChrome: false,
        debug: false,
        logQR: false,
        disableWelcome: true,
        createPathFileToken: true,
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
        catchQR: (base64Qr, asciiQR) => {
            console.log('Please scan this QR code to login:');
            console.log(asciiQR);
        },
        statusFind: (statusSession, session) => {
            console.log('Status:', statusSession);
            
            switch (statusSession) {
                case 'isLogged':
                    console.log('Successfully connected to WhatsApp!');
                    break;
                case 'notLogged':
                    console.log('Session is not valid, please wait for QR Code...');
                    break;
                case 'browserClose':
                    console.log('Browser closed, restarting...');
                    break;
                case 'qrReadSuccess':
                    console.log('QR Code scanned successfully!');
                    break;
                case 'qrReadFail':
                    console.log('QR Code scan failed. Please try again.');
                    cleanTokens(); // Clean tokens if QR scan fails
                    break;
                case 'autocloseCalled':
                case 'desconnectedMobile':
                    console.log('Session ended, cleaning up...');
                    cleanTokens();
                    break;
            }
        }
    };

    try {
        const client = await venom.create(config);
        await start(client);
    } catch (error) {
        console.error('Error in bot creation:', error);
        if (error.message.includes('protocol') || error.message.includes('token')) {
            console.log('\nDetected corrupted session. Cleaning up and restarting...');
            cleanTokens();
            console.log('Please restart the bot to scan a new QR code.');
            process.exit(1);
        }
    }
}

// Start the bot
console.log('Starting WhatsApp bot...');
console.log('Using tokens directory:', TOKEN_DIR);
createInstance(); 