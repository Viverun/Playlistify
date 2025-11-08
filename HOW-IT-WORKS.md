# 🎵 HOW IT WORKS - Visual Guide

## The Flow of Data

```
┌─────────────────┐
│   YOU            │
│   (PowerShell)   │  ← You type commands here
└────────┬─────────┘
         │
         │ HTTP Request
         │ {"tool":"search-track", "input":{"query":"happy"}}
         ↓
┌─────────────────────────┐
│   YOUR SERVER            │
│   (localhost:3001)       │  ← Running on your computer
│                          │
│  • Has your Spotify      │
│    credentials           │
│  • Validates requests    │
│  • Caches results        │
│  • Adds NLP features     │
└────────┬────────────────┘
         │
         │ Spotify API Request
         │ (with your credentials)
         ↓
┌─────────────────────────┐
│   SPOTIFY API            │
│   (api.spotify.com)      │  ← Spotify's servers
│                          │
│  • Searches music        │
│  • Gets recommendations  │
│  • Creates playlists     │
└────────┬────────────────┘
         │
         │ Music Data Response
         │ {tracks: [...], artists: [...]}
         ↓
┌─────────────────┐
│   YOUR SERVER    │  ← Processes & formats data
└────────┬─────────┘
         │
         │ JSON Response
         ↓
┌─────────────────┐
│   YOU            │  ← You see the results!
│   (PowerShell)   │
└─────────────────┘
```

---

## What Happens Step-by-Step

### When You Start the Server (`.\start-server.ps1`)

```
1. PowerShell reads start-server.ps1
   ↓
2. Sets environment variables:
   - SPOTIFY_CLIENT_ID = "e7b084..."
   - SPOTIFY_CLIENT_SECRET = "5db1a2..."
   - SPOTIFY_REFRESH_TOKEN = "AQDJ1d..."
   ↓
3. Runs: npm start
   ↓
4. TypeScript code in src/main.ts starts
   ↓
5. Express web server starts listening on port 3001
   ↓
6. You see: "MCP server listening on http://localhost:3001/mcp"
   ↓
7. Server is now waiting for requests!
```

---

### When You Make a Search Request

```
1. You type PowerShell command:
   Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp"
   -Body '{"tool":"search-track","input":{"query":"happy"}}'

   ↓

2. PowerShell sends HTTP POST request to your server

   ↓

3. Your server (src/main.ts) receives it:
   ✓ Validates the request format
   ✓ Checks rate limiter (not too many requests)
   ✓ Checks cache (was this searched recently?)

   ↓

4. Server calls spotifyHandler.searchTracks():
   - Uses your refresh token to get access token
   - Makes request to Spotify API
   - URL: https://api.spotify.com/v1/search?q=happy&type=track

   ↓

5. Spotify API responds with track data:
   {
     "tracks": {
       "items": [
         {
           "name": "Happy",
           "artists": ["Pharrell Williams"],
           "uri": "spotify:track:60nZcImufyMA1MKQY3dcCH"
         },
         ...
       ]
     }
   }

   ↓

6. Your server processes the response:
   - Formats it nicely
   - Saves to cache for next time
   - Adds metadata

   ↓

7. Server sends response back to PowerShell

   ↓

8. PowerShell displays the results!
```

---

## Key Concepts

### 1. **Environment Variables** (Your Credentials)

```
Think of these as a secure notepad where your server
reads your Spotify login info without you typing it every time.

┌─────────────────────────────┐
│ Environment Variables       │
│ (Temporary, this session)   │
├─────────────────────────────┤
│ CLIENT_ID = "e7b084..."     │
│ CLIENT_SECRET = "5db1a2..." │ ← Stored in memory
│ REFRESH_TOKEN = "AQDJ1d..." │
└─────────────────────────────┘
```

### 2. **HTTP Requests** (How You Talk to the Server)

```
Request = Message you send TO the server
Response = Message you get BACK from the server

Your Command → [Request] → Server → [Response] → Results
```

### 3. **Tokens** (Spotify's Security Keys)

```
CLIENT_ID + CLIENT_SECRET
         ↓
     (exchange for)
         ↓
   REFRESH_TOKEN (permanent)
         ↓
     (use to get)
         ↓
   ACCESS_TOKEN (1 hour, auto-renewed)
         ↓
    (use to access)
         ↓
   SPOTIFY API DATA
```

### 4. **The Three Tools** You Can Use

```
┌─────────────────────────────────────────┐
│ Tool 1: search-track                    │
│ Purpose: Find songs by name/artist      │
│ Example: "happy", "taylor swift"        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Tool 2: recommend                        │
│ Purpose: Get song suggestions           │
│ Example: genres=["pop","rock"]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Tool 3: create-playlist                  │
│ Purpose: Make a new Spotify playlist    │
│ Example: name="My Cool Playlist"        │
└─────────────────────────────────────────┘
```

---

## File Structure - What Does What?

```
d:\VS Code\apify project\
│
├── start-server.ps1          ← YOUR STARTING POINT!
│                                (Sets credentials, starts server)
│
├── test-server.ps1           ← Test if it works
│
├── src/
│   ├── main.ts              ← Main server code (Express HTTP server)
│   ├── spotifyHandler.ts    ← Talks to Spotify API
│   ├── cache.ts             ← Remembers recent searches
│   ├── nlpHelper.ts         ← Understands "workout", "happy", etc.
│   ├── rateLimiter.ts       ← Prevents too many requests
│   └── types.ts             ← Data structure definitions
│
├── package.json             ← Lists all the code libraries needed
│
└── Documentation:
    ├── START-HERE.md        ← Beginner guide (you are here!)
    ├── HOW-IT-WORKS.md      ← This file!
    ├── QUICKSTART.md        ← Quick reference
    └── SPOTIFY_CREDENTIALS_GUIDE.md  ← How to get credentials
```

---

## Under the Hood - The Tech Stack

```
┌─────────────────────────────────────────┐
│         PowerShell (you)                │
│         Your interface                  │
└──────────────┬──────────────────────────┘
               │
               ↓ HTTP
┌─────────────────────────────────────────┐
│     Express.js (web server)             │
│     Handles incoming requests           │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│     TypeScript (programming language)   │
│     Your server logic                   │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│     spotify-web-api-node (library)      │
│     Simplifies Spotify API calls        │
└──────────────┬──────────────────────────┘
               │
               ↓ HTTPS
┌─────────────────────────────────────────┐
│     Spotify Web API                     │
│     The actual music database           │
└─────────────────────────────────────────┘
```

---

## Security - How Your Credentials Stay Safe

```
1. ✓ Credentials stored in start-server.ps1
   (Not committed to GitHub - in .gitignore)

2. ✓ Loaded as environment variables
   (Only exist while PowerShell is running)

3. ✓ Never sent to clients
   (Your server uses them internally)

4. ✓ Transmitted securely to Spotify
   (HTTPS encryption)

5. ✓ Client Secret marked as sensitive
   (Should never be shared)
```

---

## Common Operations Explained

### "Search for a song"

```
1. You send query: "bohemian rhapsody"
2. Server checks cache (did we search this recently?)
3. If not cached:
   - Server asks Spotify API
   - Spotify searches its 100M+ song database
   - Returns matching tracks
4. Server caches result (so next search is instant)
5. Server formats and returns to you
```

### "Get recommendations"

```
1. You provide: genres=["rock"], targetEnergy=0.8
2. NLP Helper translates: "rock" → valid Spotify genre
3. Server asks Spotify recommendation engine
4. Spotify's AI analyzes:
   - Similar songs
   - Audio features (tempo, energy, mood)
   - Listening patterns
5. Returns 20 recommended tracks
```

### "Create a playlist"

```
1. You provide: name="My Playlist", tracks=[...]
2. Server authenticates with Spotify
3. Server calls: POST /v1/users/{user}/playlists
4. Spotify creates playlist in YOUR account
5. If tracks provided:
   - Server calls: POST /v1/playlists/{id}/tracks
   - Adds up to 100 tracks at once
6. Returns playlist URL
```

---

## Why Two PowerShell Windows?

```
Window 1 (Server):
┌─────────────────────────┐
│ $ .\start-server.ps1    │  ← Starts server
│                         │
│ Server listening...     │  ← Keeps running
│ (waiting for requests)  │  ← Can't type here!
│                         │
└─────────────────────────┘

Window 2 (Client/You):
┌─────────────────────────┐
│ $ .\test-server.ps1     │  ← Sends requests
│                         │
│ ✓ Search successful!    │  ← See results
│ [track data...]         │
│                         │
│ $ (type more commands)  │  ← Interactive
└─────────────────────────┘
```

**Why?** The server window is "busy" listening for requests.
You need a separate window to SEND those requests!

---

## Next Steps

Now that you understand HOW it works, go back to **START-HERE.md** and:

1. Start your server
2. Test it
3. Try your own searches!

**Questions?** All the commands are in START-HERE.md! 🚀
