#!/bin/bash
set -e
# Start .NET app in background (nginx proxies to 127.0.0.1:5001)
dotnet "Cardano API.dll" &
# Run nginx in foreground so container stays alive
exec nginx -g 'daemon off;'
