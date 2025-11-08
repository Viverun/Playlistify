# 🎉 YOUR SPOTIFY MCP SERVER IS READY!

## ✅ What You Have

You now have a fully functional **Spotify MCP (Model Context Protocol) Server** that can:

- 🔍 Search for tracks on Spotify
- 🎵 Get personalized recommendations
- 📝 Create and populate playlists
- 🧠 Use natural language processing for playlist descriptions
- ⚡ Cache responses for better performance
- 🔐 Securely authenticated with your Spotify account

---

## 📋 Your Credentials

**Safely stored in** `start-server.ps1`:

- ✅ Client ID: `e7b084553d51471fbc32cb2e8a90936d`
- ✅ Client Secret: `5db1a269182b45c5ba59406192bfa704` (keep private!)
- ✅ Refresh Token: `AQDJ1d_74Td9rg8aiCadUkl6EJm1E9ewEk58ALOzBHRSrbZsOrnDnfr3lCxYkWg33XDjo2Y2HNGbR2p6O0XFseCDrW5KER6A1sOv4rCZYEHZ4NisDsnCYshwcVEmO2ITQDs` (keep private!)

---

## 🚀 How to Run

### Option 1: Using the Startup Script (Easiest)

Open PowerShell in this folder and run:

```powershell
.\start-server.ps1
```

This will:

- Set all environment variables automatically
- Start the MCP server on `http://localhost:3001`
- Enable NLP features

### Option 2: Manual Start

```powershell
# Set environment variables
$env:SPOTIFY_CLIENT_ID = "e7b084553d51471fbc32cb2e8a90936d"
$env:SPOTIFY_CLIENT_SECRET = "5db1a269182b45c5ba59406192bfa704"
$env:SPOTIFY_REFRESH_TOKEN = "AQDJ1d_74Td9rg8aiCadUkl6EJm1E9ewEk58ALOzBHRSrbZsOrnDnfr3lCxYkWg33XDjo2Y2HNGbR2p6O0XFseCDrW5KER6A1sOv4rCZYEHZ4NisDsnCYshwcVEmO2ITQDs"
$env:ENABLE_NLP = "true"

# Start the server
npm start
```

---

## Testing the Server

### Quick Test

Once the server is running, open a **NEW PowerShell window** and run:

```powershell
.\test-server.ps1
```

This script will:

1. Check if the server is healthy
2. Search for "happy" tracks on Spotify
3. Get personalized recommendations

### Manual Testing

Or test manually:

```powershell
# Health check
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/"

# Search for tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"search-track","input":{"query":"happy","limit":5}}' `
  -ContentType "application/json"

# Get recommendations
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["pop","happy"],"limit":10}}' `
  -ContentType "application/json"

# Create a playlist
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"create-playlist","input":{"name":"My Test Playlist","description":"Created by MCP!","tracks":["spotify:track:6habFhsOp2NvshLv26DqMb"]}}' `
  -ContentType "application/json"
```

---

## 📝 Available API Endpoints

### `GET /`

Health check endpoint

- Returns: `{ "status": "ok" }`

### `GET /stats`

Get cache and rate limiter statistics

- Returns: Cache hits/misses, rate limiter stats

### `POST /mcp`

Main MCP endpoint for tool invocation

**Available Tools:**

#### 1. `search-track`

Search for tracks on Spotify

```json
{
  "tool": "search-track",
  "input": {
    "query": "happy birthday",
    "limit": 10,
    "offset": 0
  }
}
```

#### 2. `recommend`

Get personalized recommendations

```json
{
  "tool": "recommend",
  "input": {
    "genres": ["pop", "rock"],
    "seedTracks": ["spotify:track:123..."],
    "seedArtists": ["spotify:artist:456..."],
    "limit": 20,
    "targetEnergy": 0.8,
    "targetValence": 0.9
  }
}
```

#### 3. `create-playlist`

Create a playlist (optionally with tracks)

```json
{
  "tool": "create-playlist",
  "input": {
    "name": "My Awesome Playlist",
    "description": "Created via MCP",
    "tracks": ["spotify:track:123...", "spotify:track:456..."],
    "isPublic": false
  }
}
```

---

## 🧠 Natural Language Features

When `ENABLE_NLP=true`, the server understands moods and activities:

**Moods:** happy, sad, energetic, calm, mellow, romantic, party, focus, workout

**Activities:** workout, running, study, coding, party, chill, sleep

Example:

```json
{
  "tool": "recommend",
  "input": {
    "genres": ["workout music"],
    "limit": 20
  }
}
```

The NLP engine will automatically translate "workout" to genres like `edm`, `hip-hop`, `rock`.

---

## 📁 Project Files

- **`start-server.ps1`** - Quick start script with credentials
- **`test-server.ps1`** - Test script to verify server functionality
- **`get-token.ps1`** - Script used to get your refresh token (already done!)
- **`src/main.ts`** - Main server entry point
- **`src/spotifyHandler.ts`** - Spotify API integration
- **`src/nlpHelper.ts`** - Natural language processing
- **`src/cache.ts`** - Response caching
- **`src/rateLimiter.ts`** - Rate limiting
- **`examples.http`** - HTTP request examples (for REST clients)

---

## 🔧 Troubleshooting

### Server won't start

- Make sure port 3001 is not already in use
- Check that all npm packages are installed: `npm install`
- Verify environment variables are set

### "Invalid credentials" error

- Double-check your Client ID, Client Secret, and Refresh Token
- Make sure there are no extra spaces when copying

### "Refresh token failed" error

- Your refresh token might have expired or been revoked
- Go to https://www.spotify.com/account/apps/ and remove access
- Follow the guide in `SPOTIFY_CREDENTIALS_GUIDE.md` to get a new token

### Requests timing out

- Check your internet connection
- Spotify API might be down (rare)
- Rate limiter might have kicked in (wait a moment)

---

## 🚢 Deploying to Apify

When you're ready to deploy to Apify:

1. Follow the checklist in `CHECKLIST.md`
2. Set environment variables in Apify Actor settings:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET` (mark as secret)
   - `SPOTIFY_REFRESH_TOKEN` (mark as secret)
   - `ENABLE_NLP=true`
3. Push to Apify using `apify push`
4. Run your actor!

---

## 📚 More Information

- **Full documentation**: See `README.md`
- **Setup guide**: See `SETUP.md`
- **Architecture**: See `PROJECT_SUMMARY.md`
- **Deployment checklist**: See `CHECKLIST.md`
- **Getting credentials**: See `SPOTIFY_CREDENTIALS_GUIDE.md`

---

## ✅ Quick Checklist

- [x] Spotify app created
- [x] Client ID obtained
- [x] Client Secret obtained
- [x] Refresh token generated
- [x] Dependencies installed (`npm install`)
- [x] Project built (`npm run build`)
- [x] Server tested and working
- [ ] Deployed to Apify (optional)

---

## 🎉 You're All Set!

Your Spotify MCP server is ready to use!

**To start the server:**

```powershell
.\start-server.ps1
```

**To test it:**

```powershell
.\test-server.ps1  # In a NEW PowerShell window
```

**Have fun creating playlists and exploring Spotify data!** 🎵🎶🎧

---

**Questions?** Check the documentation files or the troubleshooting section above.
