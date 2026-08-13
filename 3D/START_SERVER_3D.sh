#!/bin/bash
# Start the Cozy Island 3D local dev server
cd "$(dirname "$0")"
python3 -m http.server 8766
