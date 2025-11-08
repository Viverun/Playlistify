# 📋 INPUT/OUTPUT SCHEMAS

Simple reference for creating unique Spotify playlists.

---

## 🌐 Base Server URL

```
http://localhost:3001
```

---

## 🎵 TOOL 1: Get Recommendations (Main Feature!)

**Purpose:** Get unique tracks based on mood/activity to build playlists

### INPUT

```json
{
  "tool": "recommend",
  "input": {
    "genres": ["workout"],
    "limit": 20
  }
}
```

**Parameters:**

- `genres` (required) - Array of moods/activities or real genres
- `limit` (optional) - Number of tracks (1-100, default: 20)
- `targetEnergy` (optional) - Energy level 0.0-1.0
- `targetValence` (optional) - Happiness level 0.0-1.0

### OUTPUT

```json
{
  "status": "success",
  "data": {
    "tracks": [
      {
        "name": "Eye of the Tiger",
        "artist": "Survivor",
        "album": "Eye Of The Tiger",
        "uri": "spotify:track:2HHtWyy5CgaQbC7XSoOb0e"
      }
    ],
    "count": 20,
    "seeds": {
      "genres": ["rock", "metal", "electronic"]
    }
  },
  "timestamp": "2025-11-08T..."
}
```

**What You Get:**

- List of unique tracks matching your mood
- Spotify URIs (to add to playlists)
- Translated genres (e.g., "workout" → ["rock", "metal", "electronic"])

### NATURAL LANGUAGE KEYWORDS

Just use these words in `genres`:

**Moods:**

- `happy` → pop, dance, funk
- `energetic` → electronic, rock, metal
- `calm` → ambient, classical, chill
- `romantic` → r-n-b, soul
- `party` → dance, edm, hip-hop
- `focus` → classical, ambient, study
- `workout` → rock, metal, electronic
- `sad` → blues, indie, acoustic
- `mellow` → folk, acoustic, jazz

**Activities:**

- `workout`, `running` → high energy
- `study`, `coding` → focus music
- `party` → dance hits
- `chill` → relaxing
- `sleep` → calming
- `driving` → road trip music

---

## 📝 TOOL 2: Create Playlist

**Purpose:** Create the actual playlist in your Spotify account

### INPUT (Empty Playlist)

```json
{
  "tool": "create-playlist",
  "input": {
    "name": "My Workout Mix",
    "description": "High energy tracks"
  }
}
```

### INPUT (With Tracks)

```json
{
  "tool": "create-playlist",
  "input": {
    "name": "My Workout Mix",
    "description": "High energy tracks",
    "trackUris": [
      "spotify:track:2HHtWyy5CgaQbC7XSoOb0e",
      "spotify:track:6habFhsOp2NvshLv26DqMb"
    ]
  }
}
```

**Parameters:**

- `name` (required) - Playlist name
- `description` (optional) - Playlist description
- `trackUris` (optional) - Array of Spotify track URIs
- `isPublic` (optional) - true/false (default: false)

### OUTPUT

```json
{
  "status": "success",
  "data": {
    "playlist": {
      "id": "37i9dQZF1DXcBWIGoYBM5M",
      "name": "My Workout Mix",
      "description": "High energy tracks",
      "url": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
      "trackCount": 0
    }
  },
  "timestamp": "2025-11-08T..."
}
```

**What You Get:**

- Playlist ID
- Direct Spotify URL to view/share
- Track count
- Success confirmation

---

## 🔍 TOOL 3: Search Track

**Purpose:** Find specific songs to add to playlists

### INPUT

```json
{
  "tool": "search-track",
  "input": {
    "query": "bohemian rhapsody",
    "limit": 5
  }
}
```

**Parameters:**

- `query` (required) - Song, artist, or album name
- `limit` (optional) - Results count (default: 20)

### OUTPUT

```json
{
  "status": "success",
  "data": {
    "tracks": [
      {
        "name": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night At The Opera",
        "uri": "spotify:track:6l8GvAyoUZwWDgF1e4822w",
        "popularity": 82
      }
    ],
    "count": 5
  },
  "timestamp": "2025-11-08T..."
}
```

---

## ❌ ERROR RESPONSE

All tools return this on error:

```json
{
  "status": "error",
  "message": "Description of what went wrong",
  "timestamp": "2025-11-08T..."
}
```

**Common Errors:**

- `"Missing or invalid 'query' parameter"` - Add search query
- `"trackUris must be an array"` - Use array format
- `"Recommendations failed"` - Check genres/seeds are valid

---

## 🔄 COMPLETE WORKFLOW EXAMPLE

### Step 1: Get Recommendations

```powershell
# Get 30 workout tracks
$tracks = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":30}}' `
  -ContentType "application/json"
```

### Step 2: Extract Track URIs

```powershell
# Get URIs from response
$uris = $tracks.data.tracks | ForEach-Object { $_.uri }
```

### Step 3: Create Playlist

```powershell
# Create playlist with those tracks
$urisJson = $uris | ConvertTo-Json
$playlist = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body "{`"tool`":`"create-playlist`",`"input`":{`"name`":`"Workout Mix`",`"trackUris`":$urisJson}}" `
  -ContentType "application/json"
```

### Step 4: Done!

```powershell
# Open in Spotify
Write-Host "Playlist created: $($playlist.data.playlist.url)"
```

---

## 💡 QUICK EXAMPLES

### Example 1: Workout Playlist

```powershell
# Get tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":25}}' `
  -ContentType "application/json"
```

### Example 2: Chill Study Playlist

```powershell
# Get tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["focus","study"],"limit":30}}' `
  -ContentType "application/json"
```

### Example 3: Party Playlist

```powershell
# Get tracks
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"recommend","input":{"genres":["party"],"targetEnergy":0.9,"limit":40}}' `
  -ContentType "application/json"
```

### Example 4: Create Empty Playlist

```powershell
# Make playlist, add tracks later
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" `
  -Body '{"tool":"create-playlist","input":{"name":"My Mix","description":"Best songs"}}' `
  -ContentType "application/json"
```

---

## 📊 DATA TYPES REFERENCE

### Track Object

```typescript
{
  name: string; // Song title
  artist: string; // Main artist
  album: string; // Album name
  uri: string; // Spotify URI (spotify:track:xxx)
  previewUrl: string; // 30-sec preview MP3
  popularity: number; // 0-100 score
  durationMs: number; // Length in milliseconds
}
```

### Playlist Object

```typescript
{
  id: string; // Playlist ID
  name: string; // Playlist name
  description: string; // Description
  url: string; // Open in Spotify
  trackCount: number; // Number of tracks
  isPublic: boolean; // Public/private
}
```

---

## 🎯 USE CASES

| Want             | Tool            | Input                                                |
| ---------------- | --------------- | ---------------------------------------------------- |
| Workout playlist | recommend       | `{"genres":["workout"],"limit":30}`                  |
| Study music      | recommend       | `{"genres":["focus","study"],"limit":25}`            |
| Party songs      | recommend       | `{"genres":["party"],"targetEnergy":0.9,"limit":40}` |
| Happy music      | recommend       | `{"genres":["happy"],"limit":20}`                    |
| Chill vibes      | recommend       | `{"genres":["chill","calm"],"limit":20}`             |
| Find a song      | search-track    | `{"query":"song name","limit":5}`                    |
| Make playlist    | create-playlist | `{"name":"My Mix"}`                                  |

---

**For copy-paste commands, see:** `CHEAT-SHEET.md`  
**For complete guide, see:** `START-HERE.md`  
**For all files explained, see:** `FILE-REFERENCE.md`
