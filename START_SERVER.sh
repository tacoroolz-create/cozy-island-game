#!/bin/bash
# Cozy Island Game Server Launcher
# Double-click this file to start the game server!

cd ~/Desktop/Cozy\ Island\ Game

echo "🎮 Starting Cozy Island Game Server..."
echo "📍 Serving from: $(pwd)"
echo "🌐 Open http://localhost:8765 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8765
