# WhatsApp Auto Message Bot

A Node.js bot that automatically sends WhatsApp messages daily at 6 AM using Venom-bot.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
TARGET_NUMBER=1234567890  # Replace with target number (include country code, no + or spaces)
MESSAGE=Good morning! This is your daily automated message.  # Replace with your message
```

3. Start the bot:
```bash
npm start
```

4. The QR code will be displayed directly in your terminal. Scan this QR code with your WhatsApp:
   - Open WhatsApp on your phone
   - Go to Settings/Menu
   - Select WhatsApp Web/Linked Devices
   - Point your phone's camera at the QR code in the terminal

## Features

- Runs completely in the background (no browser window)
- QR code displayed directly in terminal
- Automatically sends messages daily at 6 AM
- Uses Venom-bot for WhatsApp integration
- Configurable message and target number through environment variables
- Persistent session (you don't need to scan QR code every time)

## Important Notes

- Make sure your computer is running at the scheduled time (6 AM) for the message to be sent
- The target phone number should include the country code without any + or spaces (e.g., 1234567890)
- Keep your WhatsApp connected to the internet
- The session will be saved locally, so you only need to scan the QR code once

## Development

To run the bot in development mode with auto-reload:
```bash
npm run dev
```

## Troubleshooting

If you encounter any issues:
1. Make sure your WhatsApp is connected to the internet
2. Check if the target number is in the correct format
3. Try deleting the `tokens` directory and restart the bot if you need to re-authenticate 