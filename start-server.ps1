# Spotify MCP Server Startup Script
Write-Host "`n==================================" -ForegroundColor Green
Write-Host " Spotify MCP Server" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Green

# Set environment variables
$env:SPOTIFY_CLIENT_ID = "e7b084553d51471fbc32cb2e8a90936d"
$env:SPOTIFY_CLIENT_SECRET = "5db1a269182b45c5ba59406192bfa704"
$env:SPOTIFY_REFRESH_TOKEN = "AQDJ1d_74Td9rg8aiCadUkl6EJm1E9ewEk58ALOzBHRSrbZsOrnDnfr3lCxYkWg33XDjo2Y2HNGbR2p6O0XFseCDrW5KER6A1sOv4rCZYEHZ4NisDsnCYshwcVEmO2ITQDs"
$env:ENABLE_NLP = "true"
$env:PORT = "3001"

Write-Host "`n✓ Environment variables set" -ForegroundColor Green
Write-Host "✓ Client ID: $env:SPOTIFY_CLIENT_ID" -ForegroundColor Cyan
Write-Host "✓ NLP Enabled: $env:ENABLE_NLP" -ForegroundColor Cyan
Write-Host "✓ Port: $env:PORT" -ForegroundColor Cyan

Write-Host "`nStarting server..." -ForegroundColor Yellow
npm start
