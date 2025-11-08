# Apify Spotify MCP Actor - Setup and Run Guide

## Quick Setup (PowerShell)

Run this script in PowerShell to set up and start the server:

```pwsh
# 1. Install dependencies
npm install

# 2. Set environment variables (replace with your actual credentials)
$env:SPOTIFY_CLIENT_ID = 'your_spotify_client_id'
$env:SPOTIFY_CLIENT_SECRET = 'your_spotify_client_secret'
$env:SPOTIFY_REFRESH_TOKEN = 'your_spotify_refresh_token'
$env:ENABLE_NLP = 'true'

# 3. Start the server
npm run start
```

## Getting Spotify Credentials

### 1. Create Spotify App

1. Go to https://developer.spotify.com/dashboard
2. Click "Create an App"
3. Fill in app name and description
4. Note your **Client ID** and **Client Secret**

### 2. Get Refresh Token

**Method 1: Using Authorization Code Flow**

```pwsh
# Step 1: Construct authorization URL (open in browser)
$clientId = 'YOUR_CLIENT_ID'
$redirectUri = 'http://localhost:8888/callback'
$scopes = 'playlist-modify-private playlist-modify-public user-read-private'

$authUrl = "https://accounts.spotify.com/authorize?client_id=$clientId&response_type=code&redirect_uri=$redirectUri&scope=$scopes"
Write-Host "Open this URL in your browser:"
Write-Host $authUrl

# Step 2: After authorizing, copy the 'code' parameter from the redirect URL

# Step 3: Exchange code for tokens
$code = 'PASTE_CODE_FROM_REDIRECT_URL'
$authString = "$clientId:YOUR_CLIENT_SECRET"
$authBytes = [System.Text.Encoding]::UTF8.GetBytes($authString)
$authHeader = [Convert]::ToBase64String($authBytes)

$body = @{
    grant_type = 'authorization_code'
    code = $code
    redirect_uri = $redirectUri
}

$response = Invoke-RestMethod -Method Post `
    -Uri 'https://accounts.spotify.com/api/token' `
    -Headers @{ Authorization = "Basic $authHeader" } `
    -Body $body `
    -ContentType 'application/x-www-form-urlencoded'

Write-Host "Refresh Token: $($response.refresh_token)"
Write-Host "Save this refresh token - it doesn't expire!"
```

**Method 2: Using curl**

```bash
# 1. Get authorization code (open in browser)
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:8888/callback&scope=playlist-modify-private%20playlist-modify-public%20user-read-private

# 2. Exchange code for tokens
curl -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=http://localhost:8888/callback"
```

## Environment Variables

Create a `.env` file in the root directory (optional, for easier management):

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
ENABLE_NLP=true
PORT=3001
```

Then load it before starting:

```pwsh
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.+)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
    }
}
npm run start
```

## Testing the Server

### 1. Check Health

```pwsh
Invoke-RestMethod http://localhost:3001/
```

### 2. Search Tracks

```pwsh
$body = @{
    tool = "search-track"
    input = @{
        query = "The Beatles"
        limit = 10
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $body -ContentType 'application/json'
```

### 3. Get Recommendations

```pwsh
$body = @{
    tool = "recommend"
    input = @{
        seedGenres = @("rock", "indie")
        limit = 20
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $body -ContentType 'application/json'
```

### 4. Create Playlist

```pwsh
# First, search for tracks to get URIs
$searchBody = @{
    tool = "search-track"
    input = @{ query = "Pink Floyd" }
} | ConvertTo-Json

$searchResult = Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $searchBody -ContentType 'application/json'
$trackUris = $searchResult.data.tracks[0..4] | ForEach-Object { $_.uri }

# Then create playlist
$createBody = @{
    tool = "create-playlist"
    input = @{
        name = "My Pink Floyd Playlist"
        description = "Created via MCP"
        trackUris = $trackUris
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $createBody -ContentType 'application/json'
```

### 5. Test with NLP

```pwsh
$body = @{
    tool = "recommend"
    input = @{
        description = "energetic workout music"
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $body -ContentType 'application/json'
```

## Running Tests

```pwsh
npm test
```

## Development Mode (Auto-reload)

```pwsh
npm run dev
```

## Building for Production

```pwsh
npm run build
node dist/main.js
```

## Deploying to Apify

### Option 1: Using Apify CLI

```pwsh
# Install Apify CLI
npm install -g apify-cli

# Login to Apify
apify login

# Deploy
apify push
```

### Option 2: Using Web IDE

1. Go to https://console.apify.com/
2. Create new Actor
3. Choose "Web IDE" as source type
4. Copy all files to the web editor
5. Set environment variables in Actor settings
6. Build and run

### Option 3: Using Git Integration

1. Push code to GitHub
2. In Apify Console, create new Actor
3. Choose "GitHub" as source type
4. Connect your repository
5. Set environment variables
6. Build and run

## Monitoring

### View Stats

```pwsh
Invoke-RestMethod http://localhost:3001/stats
```

### View Logs

Check the console output or Apify logs dashboard when deployed.

## Troubleshooting

### "Cannot find module" errors

```pwsh
npm install
```

### "Spotify authentication failed"

- Double-check your credentials
- Ensure refresh token is valid
- Verify scopes include: `playlist-modify-private`, `playlist-modify-public`, `user-read-private`

### "Port already in use"

```pwsh
# Change port
$env:PORT = '3002'
npm run start
```

### TypeScript compilation errors

```pwsh
# Clean and rebuild
Remove-Item -Recurse -Force dist
npm run build
```

## Production Checklist

- [ ] Valid Spotify credentials set
- [ ] All dependencies installed (`npm install`)
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] Environment variables configured
- [ ] Rate limiting enabled (default: on)
- [ ] Logging configured
- [ ] Health check endpoint works
- [ ] Dockerfile builds successfully (if using Docker)

## Support

- Spotify API: https://developer.spotify.com/documentation/web-api
- Apify Docs: https://docs.apify.com/
- MCP Spec: https://modelcontextprotocol.io/

---

Need help? Check the README.md for full documentation.
