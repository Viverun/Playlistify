# 📚 PROJECT FILES REFERENCE

## 🎯 Quick Navigation

- **Getting Started** → `START-HERE.md`
- **How It Works** → `HOW-IT-WORKS.md`
- **Copy-Paste Commands** → `CHEAT-SHEET.md`
- **API Reference** → This file (FILE-REFERENCE.md)
- **Input/Output Schemas** → `SCHEMAS.md`

---

## 📁 File Structure & Use Cases

### 🚀 Startup Scripts (PowerShell)

| File                     | Use Case                            | When to Use                       |
| ------------------------ | ----------------------------------- | --------------------------------- |
| **`restart-server.ps1`** | Stops old server and starts new one | **Use this!** Safest way to start |
| **`start-server.ps1`**   | Starts server with credentials      | First time starting only          |
| **`test-server.ps1`**    | Runs 3 basic tests                  | After starting server             |
| **`test-fixed.ps1`**     | Tests all new features              | Testing NLP & playlists           |
| **`get-token.ps1`**      | Gets Spotify refresh token          | Already done (one-time use)       |

**Recommended workflow:**

```powershell
# Window 1
.\restart-server.ps1

# Window 2
.\test-server.ps1
```

---

### 📖 Documentation Files

| File                               | Purpose                                | Read When                       |
| ---------------------------------- | -------------------------------------- | ------------------------------- |
| **`START-HERE.md`**                | Beginner's guide (3 steps to start)    | **Start here!** First time      |
| **`HOW-IT-WORKS.md`**              | Visual diagrams, technical explanation | Want to understand how it works |
| **`CHEAT-SHEET.md`**               | Copy-paste commands                    | Want ready commands             |
| **`QUICKSTART.md`**                | Complete reference guide               | Need full documentation         |
| **`SPOTIFY_CREDENTIALS_GUIDE.md`** | How to get Spotify credentials         | Already completed               |
| **`FILE-REFERENCE.md`**            | This file - what each file does        | Lost and need orientation       |
| **`SCHEMAS.md`**                   | Input/output schemas for API           | Building integrations           |
| **`README.md`**                    | Project overview                       | Understanding the project       |
| **`PROJECT_SUMMARY.md`**           | Architecture details                   | Deep technical dive             |
| **`CHECKLIST.md`**                 | Deployment checklist                   | Ready to deploy to Apify        |
| **`COMPLETION_REPORT.md`**         | Project completion summary             | Review what was built           |

---

### 💻 Source Code Files

| File                         | What It Does                               | Edit When                 |
| ---------------------------- | ------------------------------------------ | ------------------------- |
| **`src/main.ts`**            | Main server (Express, routing, validation) | Add new tools/endpoints   |
| **`src/spotifyHandler.ts`**  | Spotify API integration                    | Change Spotify behavior   |
| **`src/cache.ts`**           | LRU cache for responses                    | Adjust cache settings     |
| **`src/nlpHelper.ts`**       | Natural language processing                | Add new moods/activities  |
| **`src/rateLimiter.ts`**     | Rate limiting (token bucket)               | Change rate limits        |
| **`src/types.ts`**           | TypeScript interfaces                      | Add new data types        |
| **`src/playlistBuilder.ts`** | Smart playlist builder                     | Improve playlist creation |
| **`src/billing.ts`**         | Apify billing/charging                     | Adjust pricing            |
| **`src/config.ts`**          | Configuration management                   | Change defaults           |
| **`src/test.ts`**            | Automated test suite                       | Add new tests             |

---

### ⚙️ Configuration Files

| File                           | Purpose                        | When to Edit                    |
| ------------------------------ | ------------------------------ | ------------------------------- |
| **`package.json`**             | NPM dependencies & scripts     | Add new packages                |
| **`tsconfig.json`**            | TypeScript compiler settings   | Change compile options          |
| **`.gitignore`**               | Files to exclude from Git      | Add new excludes                |
| **`Dockerfile`**               | Docker container build         | Docker deployment               |
| **`LICENSE`**                  | MIT license                    | Never (unless changing license) |
| **`.actor/actor.json`**        | Apify Actor metadata           | Deploying to Apify              |
| **`.actor/INPUT_SCHEMA.json`** | Apify input form               | Change Actor inputs             |
| **`.vscode/settings.json`**    | VS Code workspace settings     | VS Code preferences             |
| **`.vscode/extensions.json`**  | Recommended VS Code extensions | Add recommended extensions      |

---

### 📝 Example Files

| File                   | Purpose                             | Use For                            |
| ---------------------- | ----------------------------------- | ---------------------------------- |
| **`examples.http`**    | REST client examples (15+ requests) | Testing with REST Client extension |
| **`project_tree.txt`** | Directory structure visualization   | See project layout                 |
| **`WELCOME.txt`**      | ASCII art banner                    | Fun!                               |

---

## 🎯 Common Tasks → Which File?

### "I want to start the server"

→ Run `.\restart-server.ps1`

### "I want to test if it works"

→ Run `.\test-server.ps1`

### "I want example commands"

→ Read `CHEAT-SHEET.md`

### "I don't understand how this works"

→ Read `HOW-IT-WORKS.md`

### "I'm completely lost"

→ Read `START-HERE.md`

### "I want to see all API endpoints and their inputs"

→ Read `SCHEMAS.md`

### "I want to add a new mood (like 'excited')"

→ Edit `src/nlpHelper.ts` → Add to `MOOD_GENRE_MAP`

### "I want to change cache duration"

→ Edit `src/cache.ts` → Change TTL values

### "I want to add a new tool"

→ Edit `src/main.ts` → Add new case in switch statement

### "I want to see example HTTP requests"

→ Open `examples.http` in VS Code

### "I need to redeploy"

→ Read `CHECKLIST.md`

---

## 🔍 Files by Priority

### 🔥 **Must Read** (Start Here)

1. `START-HERE.md` - Get started in 3 steps
2. `CHEAT-SHEET.md` - Commands to run
3. `SCHEMAS.md` - API reference

### 📖 **Should Read** (Understanding)

4. `HOW-IT-WORKS.md` - Technical explanation
5. `QUICKSTART.md` - Full documentation
6. `README.md` - Project overview

### 🔧 **Optional** (Advanced)

7. `PROJECT_SUMMARY.md` - Architecture deep dive
8. `CHECKLIST.md` - Deployment guide
9. `SPOTIFY_CREDENTIALS_GUIDE.md` - Already completed

### 📝 **Reference** (As Needed)

10. `examples.http` - REST examples
11. `FILE-REFERENCE.md` - This file
12. Source code files - When customizing

---

## 💡 Quick Tips

**Starting fresh?**

```powershell
.\restart-server.ps1  # Window 1
.\test-server.ps1     # Window 2
```

**Need commands?**
→ Open `CHEAT-SHEET.md`

**Want to understand?**
→ Open `HOW-IT-WORKS.md`

**Building integration?**
→ Open `SCHEMAS.md`

**Lost?**
→ Open `START-HERE.md`

---

## 📊 File Count

- **Scripts**: 5 PowerShell files
- **Documentation**: 13 markdown files
- **Source Code**: 10 TypeScript files
- **Configuration**: 8 config files
- **Total**: ~36 files in project

---

## 🎓 Learning Path

**Day 1:** Read `START-HERE.md`, run `restart-server.ps1` and `test-server.ps1`

**Day 2:** Read `HOW-IT-WORKS.md`, try commands from `CHEAT-SHEET.md`

**Day 3:** Read `SCHEMAS.md`, experiment with API calls

**Day 4:** Browse source code, make small customizations

**Week 2:** Read `PROJECT_SUMMARY.md`, understand architecture

**Week 3:** Deploy to Apify using `CHECKLIST.md`

---

**Next: Open `SCHEMAS.md` for complete API reference!** 📖
