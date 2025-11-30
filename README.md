# Playlistify AI - Apify Actor 🎵

> **Your words. Your vibe. Perfect playlists.** - Now available as an Apify Actor with MCP Tools!

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-orange?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/viverun/playlistfy)
[![MCP Tools](https://img.shields.io/badge/MCP-Enabled-blueviolet?style=for-the-badge)](https://docs.apify.com/platform/actors/development)
[![Spotify](https://img.shields.io/badge/Spotify-Integration-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://developer.spotify.com/)

An AI-powered playlist generator Actor that turns natural language into curated Spotify playlists. Perfect for automation, AI agents, and integrations via MCP (Model Context Protocol).

**🚀 Try it now:** [apify.com/viverun/playlistfy](https://apify.com/viverun/playlistfy)

---

## 🎯 What This Actor Does

Transform natural language prompts into personalized Spotify playlists:

1. **Input** → Describe your ideal playlist in plain text
2. **Process** → NLP engine extracts mood, genre, tempo, and era
3. **Search** → Dual-strategy approach finds perfect tracks via Spotify API
4. **Output** → Get curated track list with Spotify URIs ready for use

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **Natural Language** | Just type what you're feeling - *"High energy 80s pop for workout"* |
| 🌍 **Multi-Language** | Works with English, Hindi, Tamil, and Telugu |
| 🎯 **Smart Selection** | Combines direct search + Spotify recommendations |
| ⚡ **Fast Results** | Intelligent caching for instant responses |
| 🔌 **MCP Integration** | Use as a tool for AI agents |
| 🎨 **Clean Output** | Automatic duplicate detection |

---

## 🚀 Quick Start

### Using Apify Console

1. Go to [Playlistify Actor](https://apify.com/viverun/playlistfy)
2. Enter your prompt (e.g., *"Relaxing jazz for studying"*)
3. Click **Start**
4. Get your curated playlist!

### Using Apify API

```bash
curl -X POST "https://api.apify.com/v2/acts/viverun~playlistfy/runs?token=YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Upbeat indie rock for road trip"
  }'
```

### Using MCP (Model Context Protocol)

This Actor exposes MCP tools for AI agent integration:

```json
{
  "tool": "search-track",
  "input": {
    "query": "bohemian rhapsody queen"
  }
}
```

---

## 📥 Input Schema

<table>
<tr>
<th>Field</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
<tr>
<td><strong>prompt</strong></td>
<td>String</td>
<td>✅ Yes</td>
<td>Natural language description of your desired playlist. Supports English, Hindi, Tamil, Telugu.</td>
</tr>
<tr>
<td><strong>maxTracks</strong></td>
<td>Integer</td>
<td>No</td>
<td>Maximum number of tracks to return (default: 10, max: 50)</td>
</tr>
<tr>
<td><strong>includePreview</strong></td>
<td>Boolean</td>
<td>No</td>
<td>Include 30-second preview URLs when available</td>
</tr>
</table>

### Example Input

```json
{
  "prompt": "Melancholic indie rock for late night introspection",
  "maxTracks": 15,
  "includePreview": true
}
```

---

## 📤 Output Schema

The Actor stores results in the default dataset. Each run produces a list of tracks:

```json
{
  "tracks": [
    {
      "name": "Skinny Love",
      "artist": "Bon Iver",
      "album": "For Emma, Forever Ago",
      "uri": "spotify:track:1a7POvGUlBxPtMVMjBZ6yQ",
      "previewUrl": "https://p.scdn.co/mp3-preview/..."
    }
  ],
  "metadata": {
    "totalTracks": 15,
    "prompt": "Melancholic indie rock for late night introspection",
    "generatedAt": "2025-11-30T12:00:00Z"
  }
}
```

### Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `tracks` | Array | List of curated track objects |
| `tracks[].name` | String | Track title |
| `tracks[].artist` | String | Artist name |
| `tracks[].album` | String | Album name |
| `tracks[].uri` | String | Spotify URI for the track |
| `tracks[].previewUrl` | String | 30-second preview URL (if available) |
| `metadata.totalTracks` | Integer | Number of tracks returned |
| `metadata.prompt` | String | Original input prompt |
| `metadata.generatedAt` | String | ISO timestamp of generation |

---

## 🔌 MCP Tools

This Actor provides three MCP tools for AI agent integration:

### 1. `search-track`
Search Spotify for specific tracks by query.

```json
{
  "tool": "search-track",
  "input": {
    "query": "Shape of You Ed Sheeran"
  }
}
```

### 2. `recommend`
Get AI-powered track recommendations based on mood/genre.

```json
{
  "tool": "recommend",
  "input": {
    "mood": "energetic",
    "genre": "pop",
    "era": "2010s"
  }
}
```

### 3. `create-playlist`
Create a playlist directly on Spotify (requires OAuth).

```json
{
  "tool": "create-playlist",
  "input": {
    "name": "My Workout Mix",
    "tracks": ["spotify:track:xxx", "spotify:track:yyy"]
  }
}
```

---

## 📝 Example Prompts

Try these prompts to get started:

| Prompt | Expected Result |
|--------|-----------------|
| *"Energetic workout songs from the 2000s"* | High-BPM pop/rock hits |
| *"Relaxing acoustic guitar for Sunday morning"* | Soft acoustic tracks |
| *"Dark electronic music for late night coding"* | Ambient/synthwave tracks |
| *"Happy pop songs for a road trip"* | Upbeat sing-along tracks |
| *"खुश गाने सुबह के लिए"* (Hindi) | Happy morning songs |
| *"இரவு நேரத்திற்கான மெதுவான பாடல்கள்"* (Tamil) | Slow night songs |

---

## 💰 Pricing

This Actor uses **pay-per-event** pricing:

| Event | Cost |
|-------|------|
| Per playlist generation | ~$0.01-0.02 |
| Per track search | ~$0.001 |

*Exact costs depend on complexity and number of API calls.*

---

## 🔧 Integration Examples

### Zapier Integration

1. Create a new Zap
2. Choose **Apify** as trigger/action
3. Select **Run Actor**
4. Configure with Playlistify Actor ID: `viverun/playlistfy`

### Make (Integromat)

1. Add Apify module
2. Select **Run an Actor**
3. Enter Actor ID and input JSON

### LangChain / AI Agents

```python
from langchain.tools import ApifyTool

playlist_tool = ApifyTool(
    actor_id="viverun/playlistfy",
    name="playlist_generator",
    description="Generate Spotify playlists from natural language"
)
```

---

## 📊 Actor Configuration

### `.actor/actor.json`

```json
{
  "actorSpecification": 1,
  "name": "playlistfy",
  "title": "Playlistify AI - Spotify Playlist Generator",
  "version": "1.0.0",
  "buildTag": "latest",
  "output": "./output_schema.json"
}
```

### `.actor/output_schema.json`

```json
{
  "actorOutputSchemaVersion": 1,
  "title": "Playlistify AI Output",
  "description": "Generated Spotify playlist tracks",
  "properties": {
    "playlist": {
      "type": "string",
      "title": "🎵 Generated Playlist",
      "template": "{{links.apiDefaultDatasetUrl}}/items"
    }
  }
}
```

---

## 🛠️ Technical Details

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js 18+ |
| **Language** | TypeScript |
| **API** | Spotify Web API |
| **NLP** | Custom keyword parser |
| **Protocol** | MCP (Model Context Protocol) |

---

## 🐛 Troubleshooting

<details>
<summary><strong>No tracks returned</strong></summary>

- Check if your prompt is descriptive enough
- Try using English if other languages don't work
- Verify the mood/genre combination exists in Spotify

</details>

<details>
<summary><strong>Rate limiting errors</strong></summary>

- Wait a few minutes and retry
- Reduce `maxTracks` parameter
- Contact support if issue persists

</details>

<details>
<summary><strong>MCP connection issues</strong></summary>

- Verify your API token is valid
- Check the Actor is running in Standby mode for MCP
- Review MCP server configuration

</details>

---

## 👥 Team DDoxer

Built for **Hack This Fall 2025** 🏆

| Team Member | Role |
|-------------|------|
| **Avanish Kasar** | Lead Developer |
| **Jamil** | Co-Developer |

---

## 🔗 Related Links

- 🌐 **Live Demo:** [playlistify.up.railway.app](https://playlistify.up.railway.app)
- 📦 **GitHub:** [github.com/avanishkasar/Playlistify-AI](https://github.com/avanishkasar/Playlistify-AI)
- 📖 **Apify Docs:** [docs.apify.com](https://docs.apify.com)
- 🎵 **Spotify API:** [developer.spotify.com](https://developer.spotify.com)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ by Team DDoxer**

[![Apify](https://img.shields.io/badge/Powered%20by-Apify-orange?style=for-the-badge&logo=apify)](https://apify.com)

</div>
