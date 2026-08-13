#!/usr/bin/env osascript
-- Double-clickable macOS launcher for the Cozy Island 3D dev server
tell application "Terminal"
    do script "cd \"/Users/clockworkwellness/Desktop/Cozy Island Game/3D\" && python3 -m http.server 8766"
end tell
