#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Tarn locally..."
echo ""
echo "Once the server starts, open this in your browser:"
echo "  http://localhost:8000"
echo ""
echo "To use it from your phone (same Wi-Fi), find this computer's local IP"
echo "(e.g. 'ifconfig' or check Wi-Fi settings) and open http://YOUR-IP:8000"
echo "on the phone instead."
echo ""
echo "Press CTRL+C to stop the server."
echo ""
python3 -m http.server 8000
