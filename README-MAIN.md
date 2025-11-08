# 🎵 Spotify MCP Server

**AI-powered server that creates unique, personalized Spotify playlists.**

Tell it what you want - "workout energy", "chill coding", "happy party vibes" - and it instantly creates custom playlists in your Spotify account.

---

## 🎯 Main Purpose

**Creates unique playlists** by understanding natural language:

- Say "workout" → Gets high-energy rock, electronic, metal tracks
- Say "focus" → Gets ambient, classical study music
- Say "party" → Gets dance, hip-hop, EDM bangers
- Say "chill" → Gets mellow, relaxing vibes

Then **creates the playlist directly in your Spotify** with one command!

---

## 🚀 Quick Start

```powershell
# Start server
.\restart-server.ps1

# Create a workout playlist
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":20}}' `
  -ContentType "application/json"

# Or make a playlist instantly
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"create-playlist","input":{"name":"Workout Mix","description":"High energy!"}}' `
  -ContentType "application/json"
```

---

## 🎨 Example Use Cases

### "I need a workout playlist"

```powershell
# Get 30 high-energy tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":30}}' `
  -ContentType "application/json"
```

### "I want focus music for coding"

```powershell
# Get calm, ambient study tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["focus","coding"],"limit":25}}' `
  -ContentType "application/json"
```

### "Create a party playlist"

```powershell
# Make a new playlist in Spotify
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"create-playlist","input":{"name":"Party Time","description":"Dance hits"}}' `
  -ContentType "application/json"
```

---

## 🧠 Natural Language Keywords

Just use these words and the server translates them to real music:

**Moods:** happy, sad, energetic, calm, romantic, party, focus, workout

**Activities:** workout, running, study, coding, party, chill, sleep, driving

---

## 📚 Documentation

- **`START-HERE.md`** - 3-step beginner guide
- **`CHEAT-SHEET.md`** - Copy-paste commands
- **`SCHEMAS.md`** - Complete API reference
- **`FILE-REFERENCE.md`** - All files explained

---

## 💡 How It Works

1. You describe what you want ("workout", "chill", "party")
2. Server translates to real Spotify genres using NLP
3. Gets recommendations from Spotify's 100M+ song catalog
4. Creates a unique playlist in your account

**All running on your computer. Your credentials stay private.**

---

## 🎵 Three Tools Available

1. **`search-track`** - Find specific songs
2. **`recommend`** - Get personalized suggestions (the main feature!)
3. **`create-playlist`** - Make playlists in Spotify

---

## ⚡ Quick Commands

```powershell
# Start server
.\restart-server.ps1

# Test it works
.\test-server.ps1

# Get recommendations
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["happy"],"limit":20}}' `
  -ContentType "application/json"
```

---

**That's it! Create unique playlists in seconds.** 🎧

For detailed docs, see `START-HERE.md` | For commands, see `CHEAT-SHEET.md` | For API specs, see `SCHEMAS.md`
