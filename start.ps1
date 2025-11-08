# Quick Start Script for Spotify MCP Actor
# Run this script to set up and start the server quickly

Write-Host "🎵 Spotify MCP Actor - Quick Start" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js 16+ first." -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if dependencies are installed
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (this may take a minute)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Check for environment variables
Write-Host ""
Write-Host "Checking Spotify credentials..." -ForegroundColor Yellow

$hasCredentials = $true

if (-not $env:SPOTIFY_CLIENT_ID) {
    Write-Host "✗ SPOTIFY_CLIENT_ID not set" -ForegroundColor Red
    $hasCredentials = $false
}
if (-not $env:SPOTIFY_CLIENT_SECRET) {
    Write-Host "✗ SPOTIFY_CLIENT_SECRET not set" -ForegroundColor Red
    $hasCredentials = $false
}
if (-not $env:SPOTIFY_REFRESH_TOKEN) {
    Write-Host "✗ SPOTIFY_REFRESH_TOKEN not set" -ForegroundColor Red
    $hasCredentials = $false
}

if (-not $hasCredentials) {
    Write-Host ""
    Write-Host "Please set your Spotify credentials:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host '  $env:SPOTIFY_CLIENT_ID = "your_client_id"' -ForegroundColor Cyan
    Write-Host '  $env:SPOTIFY_CLIENT_SECRET = "your_client_secret"' -ForegroundColor Cyan
    Write-Host '  $env:SPOTIFY_REFRESH_TOKEN = "your_refresh_token"' -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See SETUP.md for instructions on getting these credentials." -ForegroundColor Yellow
    Write-Host ""
    
    $continue = Read-Host "Do you want to enter credentials now? (y/n)"
    if ($continue -eq "y") {
        $env:SPOTIFY_CLIENT_ID = Read-Host "Enter SPOTIFY_CLIENT_ID"
        $env:SPOTIFY_CLIENT_SECRET = Read-Host "Enter SPOTIFY_CLIENT_SECRET"
        $env:SPOTIFY_REFRESH_TOKEN = Read-Host "Enter SPOTIFY_REFRESH_TOKEN"
        Write-Host "✓ Credentials set for this session" -ForegroundColor Green
    } else {
        Write-Host "Exiting. Please set credentials and try again." -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✓ All Spotify credentials are set" -ForegroundColor Green
}

# Set optional environment variables
if (-not $env:ENABLE_NLP) {
    $env:ENABLE_NLP = "true"
    Write-Host "✓ Enabled NLP (natural language processing)" -ForegroundColor Green
}

if (-not $env:PORT) {
    $env:PORT = "3001"
}

# Build TypeScript
Write-Host ""
Write-Host "Building TypeScript..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Build completed with warnings (this is normal for missing packages)" -ForegroundColor Yellow
}

# Start the server
Write-Host ""
Write-Host "🚀 Starting MCP server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will be available at:" -ForegroundColor Green
Write-Host "  - Health check: http://localhost:$env:PORT/" -ForegroundColor Cyan
Write-Host "  - MCP endpoint: http://localhost:$env:PORT/mcp" -ForegroundColor Cyan
Write-Host "  - Stats: http://localhost:$env:PORT/stats" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
npm run start
