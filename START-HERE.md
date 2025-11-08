# 🚀 GET STARTED IN 3 STEPS

## Step 1: Start the Server (1 command)

Open PowerShell in this folder and run:

```powershell
.\start-server.ps1
```

**What this does:**

- Sets your Spotify credentials automatically
- Starts the server on http://localhost:3001
- You'll see: "MCP server listening on http://localhost:3001/mcp"

**Keep this window open!** The server needs to stay running.

---

## Step 2: Test It (1 command)

Open a **NEW** PowerShell window and run:

```powershell
cd "d:\VS Code\apify project"
.\test-server.ps1
```

**What this does:**

- Checks if the server is working
- Searches Spotify for "happy" songs
- Gets music recommendations

You'll see green ✓ checkmarks if everything works!

---

## Step 3: Try Your Own Queries

In that same second PowerShell window, try searching for your favorite music:

```powershell
# Search for any song/artist
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"search-track","input":{"query":"your favorite song here","limit":5}}' `
  -ContentType "application/json"
```

**Replace "your favorite song here"** with anything you want to search!

---

## 🎵 How Does This Work?

### The Big Picture

```
You (PowerShell)  →  Your Server  →  Spotify API  →  Music Data
                      (localhost:3001)
```

### What Each Part Does

1. **Your Server** (`start-server.ps1`)

   - Runs on your computer at http://localhost:3001
   - Has your Spotify credentials stored securely
   - Talks to Spotify API on your behalf

2. **Spotify API**

   - Spotify's service that provides music data
   - Requires credentials (which you already have!)
   - Returns info about songs, artists, playlists

3. **Your Commands** (PowerShell requests)
   - You send requests to your server
   - Server talks to Spotify
   - Returns results back to you

---

## 🎮 What Can You Do?

### 1. Search for Music

```powershell
# Find songs by name
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"search-track","input":{"query":"bohemian rhapsody","limit":5}}' `
  -ContentType "application/json"
```

### 2. Get Recommendations

```powershell
# Get music suggestions based on genres
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["rock","pop"],"limit":10}}' `
  -ContentType "application/json"
```

### 3. Create Playlists

```powershell
# Make a new playlist in your Spotify account
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"create-playlist","input":{"name":"My Test Playlist","description":"Created via MCP"}}' `
  -ContentType "application/json"
```

---

## 🧠 Natural Language Features

Your server is **smart**! It understands moods and activities:

```powershell
# Ask for "workout" music - it knows what that means!
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":10}}' `
  -ContentType "application/json"

# Try: "happy", "sad", "party", "focus", "chill", "energetic"
```

---

## 📁 Important Files

- **`start-server.ps1`** ← Run this to start (Window 1)
- **`test-server.ps1`** ← Run this to test (Window 2)
- **`QUICKSTART.md`** ← Full documentation
- **`SPOTIFY_CREDENTIALS_GUIDE.md`** ← How credentials work

---

## ❓ Common Questions

### "Do I need to run both scripts?"

- **`start-server.ps1`** = Starts the server (must stay running)
- **`test-server.ps1`** = Tests the server (run in separate window)

### "Can I close the first window?"

No! If you close it, the server stops. Keep it open while using the server.

### "What if something goes wrong?"

1. Stop the server (Ctrl+C in first window)
2. Run `.\start-server.ps1` again
3. Try your command again

### "Where are my credentials?"

They're already saved in `start-server.ps1` - you don't need to enter them again!

---

## 🎯 Quick Reference Card

| What You Want | Command                         |
| ------------- | ------------------------------- |
| Start server  | `.\start-server.ps1` (Window 1) |
| Test server   | `.\test-server.ps1` (Window 2)  |
| Search music  | See "Search for Music" above    |
| Stop server   | Press `Ctrl+C` in Window 1      |

---

## 🎉 Ready? Let's Go!

### Right Now, Do This:

**1. Open PowerShell here**

**2. Run:**

```powershell
.\start-server.ps1
```

**3. Open ANOTHER PowerShell window**

**4. Run:**

```powershell
cd "d:\VS Code\apify project"
.\test-server.ps1
```

**5. See it work! 🎵**

---

That's it! You're now running your own Spotify music server! 🎊
