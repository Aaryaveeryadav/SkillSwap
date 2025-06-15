SkillSwap Platform with Video Calling
A comprehensive skill-sharing platform built with React, TypeScript, and real-time video calling capabilities.

🚀 Features
Core Platform
User Profiles - Complete profile management with skills, availability, and verification
Skill Matching - Advanced algorithm to match users with complementary skills
Messaging System - Real-time messaging between users
Dark Mode - Complete dark/light theme support
Responsive Design - Mobile-first design that works on all devices
Video Calling System
Peer-to-Peer Video Calls - High-quality video calls using WebRTC
Real-time Communication - Socket.IO for signaling and room management
Multi-participant Support - Support for multiple users in a call
Audio/Video Controls - Toggle camera and microphone
In-call Chat - Text messaging during video calls
Call Invitations - Send and receive video call invitations
🛠️ Tech Stack
Frontend
React 18.3.1 - Modern React with hooks
TypeScript - Full type safety
Tailwind CSS - Utility-first styling
Vite - Fast build tool
Socket.IO Client - Real-time communication
WebRTC - Peer-to-peer video calling
Backend (Video Server)
Node.js - JavaScript runtime
Express - Web framework
Socket.IO - Real-time bidirectional communication
CORS - Cross-origin resource sharing
UUID - Unique room ID generation
📁 Project Structure
skillswap-platform/
├── src/
│   ├── components/
│   │   ├── video/
│   │   │   ├── VideoCallModal.tsx      # Main video call interface
│   │   │   ├── VideoCallButton.tsx     # Button to start video calls
│   │   │   └── VideoCallInvitation.tsx # Handle incoming call invitations
│   │   ├── auth/                       # Authentication components
│   │   ├── messaging/                  # Chat and messaging
│   │   └── ...                         # Other UI components
│   ├── contexts/                       # React contexts (Auth, Theme)
│   ├── pages/                          # Page components
│   ├── types/                          # TypeScript definitions
│   └── data/                           # Mock data and constants
├── server/
│   ├── package.json                    # Server dependencies
│   └── index.js                        # Video call server
└── package.json                        # Client dependencies
🚀 Getting Started
Prerequisites
Node.js 16+
npm or yarn
Installation
Clone the repository

git clone <repository-url>
cd skillswap-platform
Install client dependencies

npm install
Install server dependencies

cd server
npm install
cd ..
Running the Application
Start the video server

npm run server:dev
The server will run on http://localhost:5000

Start the client (in a new terminal)

npm run dev
The client will run on http://localhost:5173

Production Build
# Build the client
npm run build

# Start the server in production
npm run server
🎥 Video Calling Features
Starting a Video Call
Navigate to any user profile
Click the "Video Call" button (only available for users who accept online calls)
A room will be created and the video call modal will open
Share the room ID with other participants
Video Call Controls
Camera Toggle - Turn video on/off
Microphone Toggle - Mute/unmute audio
Chat - Send text messages during the call
End Call - Leave the video call
Technical Implementation
WebRTC for peer-to-peer video/audio streaming
Socket.IO for signaling and room management
STUN servers for NAT traversal
Responsive design that works on desktop and mobile
🔧 Configuration
Environment Variables
Create a .env file in the root directory:

# Google OAuth (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Video Server URL (for production)
VITE_VIDEO_SERVER_URL=http://localhost:5000
Video Server Configuration
The video server runs on port 5000 by default. You can change this in server/index.js:

const PORT = process.env.PORT || 5000;
🌐 Deployment
Client Deployment
The client can be deployed to any static hosting service:

Netlify
Vercel
GitHub Pages
AWS S3 + CloudFront
Server Deployment
The video server can be deployed to:

Heroku
Railway
DigitalOcean
AWS EC2
Important: Update the Socket.IO connection URL in the client to point to your deployed server.

🔒 Security Considerations
Video Calls
Rooms are temporary and deleted when empty
No video/audio data is stored on the server
STUN servers are used for connection establishment
Consider implementing authentication for room access in production
General Security
Input validation on all forms
XSS protection with proper escaping
CORS configuration for API access
Rate limiting for API endpoints (recommended for production)
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
If you encounter any issues:

Check the browser console for errors
Ensure both client and server are running
Verify camera/microphone permissions are granted
Check network connectivity for WebRTC connections
For development support, please open an issue in the repository.
