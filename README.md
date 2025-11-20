# 🎵 Playlistify AI

> **AI-powered Spotify playlist generator with natural language understanding**

A production-ready Model Context Protocol (MCP) server for Spotify, deployable on the Apify platform. Create unique, personalized Spotify playlists using natural language descriptions. This Actor exposes an HTTP endpoint that AI clients can use to search tracks, get recommendations, and create playlists via natural language.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://playlistify-ai.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/avanishkasar/Playlistify-AI)
[![Hack This Fall](https://img.shields.io/badge/Hack%20This%20Fall-2025-purple)](https://hackthisfall.tech)

---

## 🌟 Overview

Playlistify AI transforms how you discover music on Spotify. Describe your mood in natural language, and our AI curates the perfect playlist instantly.

## ✨ Features

### **Core Capabilities**
* 🔍 **Smart Search** - Search Spotify's catalog with intelligent filtering
* 🎯 **AI Recommendations** - Get personalized track recommendations
* 🎨 **Natural Language** - Describe your mood or activity in plain English
* ⚡ **Lightning Fast** - Optimized caching and rate limiting
* ✅ **Auto-Create Playlists** - Instantly save playlists to your Spotify account
* 🚀 **Multi-Platform** - Web, API, and MCP server

### **MCP Server Features**
* **MCP-Compatible HTTP Server** - Exposes `/mcp` endpoint for AI tool calls
* **Three Core Tools**:
  1. `search-track` - Search Spotify catalog by keyword
  2. `recommend` - Get personalized recommendations using seeds
  3. `create-playlist` - Create playlists and add tracks

### **Advanced Capabilities**
* ✅ Automatic Spotify access token refresh
* ✅ Response caching (LRU cache with TTL)
* ✅ NLP enhancement for natural language playlist descriptions
* ✅ Request validation and error handling
* ✅ Billing integration with `Actor.charge()`
* ✅ Structured logging with `log.info()`
* ✅ TypeScript with full type safety

---

## 🔗 Live Links

| Platform | URL |
|----------|-----|
| **🌐 Website** | Coming soon (Vercel) |
| **📡 API** | Coming soon (Railway) |
| **🤖 Apify** | Coming soon |

---

## 🚀 Quick Start

### Local Development

1. **Frontend**
   ```bash
   cd ai-groove-lab
   npm install && npm run dev
   # Opens on http://localhost:8080
   ```

2. **Backend**
   ```bash
   cd Playlistify
   npm install && npm run dev
   # Runs on http://localhost:3001
   ```

3. **Get Spotify credentials** from [developer.spotify.com](https://developer.spotify.com/dashboard)

---

## 📦 Deployment (Option B Strategy)

### 🌐 Frontend → Vercel
1. Import from GitHub
2. Root: `ai-groove-lab`
3. Framework: Vite
4. Set env vars
5. Deploy!

### 🚂 Backend → Railway
1. Import from GitHub
2. Root: `Playlistify`
3. Set env vars
4. Auto-deploy!

### 🤖 MCP Server → Apify
1. Create Actor from Git
2. Folder: `Playlistify`
3. Publish to marketplace

**📖 Full guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🏗️ Tech Stack

**Frontend**: React, TypeScript, Vite, Shadcn UI, Supabase  
**Backend**: Node.js, Express, Spotify Web API  
**Deployment**: Vercel, Railway, Apify

---

## 🏆 Hackathon Tracks

- ✅ **Apify $1M Challenge** - MCP implementation
- ✅ **GitHub** - Most Creative Use
- ✅ **Main Hackathon** - Innovation prize

---

## 👥 Authors

* **Viverun** - [@Viverun](https://github.com/Viverun) - *Contributor*
* **Avanish Kasar** - [@avanishkasar](https://github.com/avanishkasar) - *Contributor*

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details

---

<div align="center">

**Made with ❤️ for Hack This Fall 2025**

[📦 GitHub](https://github.com/avanishkasar/Playlistify-AI) • [📖 Docs](./DEPLOYMENT.md)

</div>
