# ⚡ CHEAT SHEET - Copy & Paste Commands

## 🚀 Starting Up

### Window 1: Start the Server

```powershell
.\start-server.ps1
```

**Keep this window open!**

### Window 2: Test It

```powershell
cd "d:\VS Code\apify project"
.\test-server.ps1
```

---

## 🎵 Music Search Commands (Copy & Paste These!)

### Search for Songs

```powershell
# Search for "happy" songs
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"search-track","input":{"query":"happy","limit":5}}' -ContentType "application/json"

# Search for an artist
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"search-track","input":{"query":"taylor swift","limit":10}}' -ContentType "application/json"

# Search for a specific song
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"search-track","input":{"query":"bohemian rhapsody","limit":3}}' -ContentType "application/json"
```

---

## 🎧 Get Recommendations

### By Genre

```powershell
# Rock music
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["rock"],"limit":10}}' -ContentType "application/json"

# Pop music
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["pop"],"limit":10}}' -ContentType "application/json"

# Multiple genres
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["rock","pop","indie"],"limit":15}}' -ContentType "application/json"
```

### By Mood (Natural Language!)

```powershell
# Workout music
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":20}}' -ContentType "application/json"

# Happy/upbeat
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["happy"],"limit":15}}' -ContentType "application/json"

# Calm/chill
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["chill"],"limit":15}}' -ContentType "application/json"

# Party music
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["party"],"limit":20}}' -ContentType "application/json"

# Focus/study music
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["focus"],"limit":15}}' -ContentType "application/json"
```

---

## 📝 Create Playlists

### Empty Playlist

```powershell
# Create a new empty playlist
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"create-playlist","input":{"name":"My Test Playlist","description":"Created via MCP Server"}}' -ContentType "application/json"
```

### Playlist with Tracks

```powershell
# Create playlist with specific tracks (replace track URIs!)
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"create-playlist","input":{"name":"My Favorite Songs","description":"My handpicked collection","tracks":["spotify:track:60nZcImufyMA1MKQY3dcCH","spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"]}}' -ContentType "application/json"
```

---

## 🔍 Check Server Status

### Health Check

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/"
```

### See Statistics

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/stats"
```

---

## 🛠️ Utility Commands

### Stop the Server

In Window 1 (where server is running):

```
Press Ctrl+C
```

### Restart the Server

```powershell
.\start-server.ps1
```

### View Server Logs

Just look at Window 1 - all logs appear there!

---

## 🎯 Available Moods & Activities

Your server understands these keywords:

### Moods

- `happy` - Upbeat, positive vibes
- `sad` - Melancholic, emotional
- `energetic` - High energy, pumped up
- `calm` - Relaxing, peaceful
- `mellow` - Smooth, laid-back
- `romantic` - Love songs
- `party` - Dance, club music
- `focus` - Concentration music
- `workout` - Exercise motivation

### Activities

- `workout` / `running` - High energy exercise
- `study` / `coding` - Focus and concentration
- `party` - Dancing and celebration
- `chill` - Relaxation
- `sleep` - Calming bedtime music

---

## 📊 Response Format

All responses look like this:

```json
{
  "status": "success",
  "content": {
    // Your results here
  },
  "metadata": {
    "timestamp": "2025-11-08T...",
    "cached": false
  }
}
```

---

## ❌ If Something Goes Wrong

### Server not responding?

```powershell
# Check if server is running
Invoke-RestMethod -Method Get -Uri "http://localhost:3001/"
```

### Restart everything

```powershell
# In Window 1: Press Ctrl+C
# Then:
.\start-server.ps1
```

### See errors

Look at Window 1 - error messages appear there!

---

## 💡 Pro Tips

1. **Copy the commands above** - don't type them manually!
2. **Keep Window 1 open** while using the server
3. **Use Window 2** for all your searches
4. **Results are cached** - repeated searches are instant!
5. **Rate limited** - max 100 requests (refills at 10/second)

---

## 🔗 More Help

- **Beginner guide**: `START-HERE.md`
- **How it works**: `HOW-IT-WORKS.md`
- **Full docs**: `QUICKSTART.md`
- **Credentials info**: `SPOTIFY_CREDENTIALS_GUIDE.md`

---

## 🎉 Quick Start Right Now!

**1. Open PowerShell → Run:** `.\start-server.ps1`

**2. Open ANOTHER PowerShell → Run:** `cd "d:\VS Code\apify project"` then `.\test-server.ps1`

**3. Try a search from above!**

That's it! 🚀
