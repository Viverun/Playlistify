# Kill any existing server on port 3001
Write-Host "Stopping any existing server..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) {
    Stop-Process -Id $process -Force
    Write-Host "Killed old server (PID: $process)" -ForegroundColor Green
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host " Starting Spotify MCP Server" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# Set environment variables
$env:SPOTIFY_CLIENT_ID = "e7b084553d51471fbc32cb2e8a90936d"
$env:SPOTIFY_CLIENT_SECRET = "5db1a269182b45c5ba59406192bfa704"
$env:SPOTIFY_REFRESH_TOKEN = "AQDJ1d_74Td9rg8aiCadUkl6EJm1E9ewEk58ALOzBHRSrbZsOrnDnfr3lCxYkWg33XDjo2Y2HNGbR2p6O0XFseCDrW5KER6A1sOv4rCZYEHZ4NisDsnCYshwcVEmO2ITQDs"
$env:ENABLE_NLP = "true"
$env:PORT = "3001"

Write-Host "Environment variables set" -ForegroundColor Green
Write-Host ""
Write-Host "Starting server on http://localhost:3001" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start the server
npm start
