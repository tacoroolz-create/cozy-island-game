#!/usr/bin/env osascript
-- Double-clickable macOS launcher for the Cozy Island 3D dev server
tell application "Terminal"
    do script "python3 \"/Users/clockworkwellness/Desktop/Cozy Island Game/3D/serve.py\" 8766"
    activate
end tell
