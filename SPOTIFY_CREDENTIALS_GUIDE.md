# 🎵 How to Get Spotify Credentials - Complete Guide

This guide walks you through getting the three required Spotify credentials for the MCP Actor.

---

## 📋 What You Need

You need three credentials:

1. **SPOTIFY_CLIENT_ID** - Your app's public identifier
2. **SPOTIFY_CLIENT_SECRET** - Your app's secret key
3. **SPOTIFY_REFRESH_TOKEN** - A long-lived token for user authentication

---

## 🚀 Step 1: Create a Spotify Developer Account

### 1. Go to Spotify Developer Dashboard

Visit: **https://developer.spotify.com/dashboard**

### 2. Log In or Sign Up

- If you have a Spotify account (free or premium), log in
- If not, create a new Spotify account first at **https://spotify.com**

### 3. Accept Terms

- Read and accept the Spotify Developer Terms of Service
- Complete any required information

✅ **You now have a Spotify Developer account!**

---

## 🎯 Step 2: Create a Spotify App

### 1. Click "Create App"

On the dashboard, click the green **"Create App"** button

### 2. Fill in App Information

**App Name**: `Spotify MCP Actor` (or any name you prefer)

**App Description**: `MCP server for AI-powered Spotify playlist management`

**Redirect URI**: `http://127.0.0.1:8888/callback`

- ⚠️ Important: Use `127.0.0.1` NOT `localhost` (Spotify requirement as of 2025)
- Type it exactly as shown
- Click **"Add"** to add it to the list

**Which API/SDKs are you planning to use?**: Check **"Web API"**

### 3. Agree to Terms

- Check the box to agree to Spotify's Developer Terms of Service
- Check the box to agree to Branding Guidelines

### 4. Click "Save"

✅ **Your app is created!**

---

## 🔑 Step 3: Get Client ID and Client Secret

### 1. View Your App

- You'll be redirected to your app's dashboard
- Or click on your app name from the dashboard list

### 2. Click "Settings" (top right)

### 3. Copy Your Credentials

**Client ID**:

- You'll see it displayed on the settings page
- Click the **"Copy"** button or select and copy the text
- Save it somewhere safe (Notepad, etc.)

**Client Secret**:

- Click **"View client secret"**
- Click the **"Copy"** button
- Save it somewhere safe

⚠️ **Keep your Client Secret private!** Don't share it or commit it to public repositories.

✅ **You now have 2 out of 3 credentials!**

---

## 🔐 Step 4: Get Refresh Token (The Tricky Part)

This requires a few steps using your browser and PowerShell.

### Option A: Using PowerShell (Recommended for Windows)

#### 1. Prepare Your Authorization URL

Open PowerShell and run:

```powershell
# Replace with your actual Client ID
$clientId = "YOUR_CLIENT_ID_HERE"

$redirectUri = "http://127.0.0.1:8888/callback"
$scopes = "playlist-modify-private playlist-modify-public user-read-private"

$authUrl = "https://accounts.spotify.com/authorize?client_id=$clientId&response_type=code&redirect_uri=$redirectUri&scope=$scopes"

Write-Host "Open this URL in your browser:" -ForegroundColor Cyan
Write-Host $authUrl -ForegroundColor Yellow
```

#### 2. Authorize in Browser

1. Copy the URL from PowerShell output
2. Paste it into your web browser and press Enter
3. Log in to Spotify (if not already logged in)
4. Click **"Agree"** to authorize your app
5. You'll be redirected to `http://127.0.0.1:8888/callback?code=...`
6. The page will show an error (this is normal - we're not running a server)
7. **Look at the URL bar** - copy everything after `code=` and before `&` (if there's an `&`)
   - Example: If URL is `http://127.0.0.1:8888/callback?code=AQD1x2y3z...`
   - Copy only: `AQD1x2y3z...` (the authorization code)

#### 3. Exchange Code for Refresh Token

Back in PowerShell, run this (replace YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, and YOUR_AUTHORIZATION_CODE):

```powershell
# Replace these with your actual values
$clientId = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"
$code = "YOUR_AUTHORIZATION_CODE"  # The code from step 2

$redirectUri = "http://127.0.0.1:8888/callback"

# Create authorization header
$authString = "$clientId:$clientSecret"
$authBytes = [System.Text.Encoding]::UTF8.GetBytes($authString)
$authHeader = [Convert]::ToBase64String($authBytes)

# Prepare request body
$body = @{
    grant_type = 'authorization_code'
    code = $code
    redirect_uri = $redirectUri
}

# Make the request
try {
    $response = Invoke-RestMethod -Method Post `
        -Uri 'https://accounts.spotify.com/api/token' `
        -Headers @{ Authorization = "Basic $authHeader" } `
        -Body $body `
        -ContentType 'application/x-www-form-urlencoded'

    Write-Host "`n✓ Success! Here are your tokens:" -ForegroundColor Green
    Write-Host "`nAccess Token (expires in 1 hour):" -ForegroundColor Yellow
    Write-Host $response.access_token -ForegroundColor Cyan
    Write-Host "`nRefresh Token (save this - it doesn't expire!):" -ForegroundColor Yellow
    Write-Host $response.refresh_token -ForegroundColor Green

    Write-Host "`n✓ Copy the REFRESH TOKEN above - this is what you need!" -ForegroundColor Green

} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure your Client ID, Client Secret, and Code are correct" -ForegroundColor Yellow
}
```

#### 4. Save Your Refresh Token

The **refresh_token** value that appears is what you need!

- Copy it and save it securely
- This token doesn't expire, so you only need to do this once

✅ **You now have all 3 credentials!**

---

### Option B: Using Online Tool (Alternative)

If PowerShell is difficult, you can use this helper tool:

1. Visit: **https://github.com/thelinmichael/spotify-web-api-node**
2. Follow their authentication examples
3. Or use this online tool: **https://www.spotify-token-generator.com/** (third-party)

⚠️ Be careful with third-party tools - they might see your tokens!

---

### Option C: Using curl (Linux/Mac)

```bash
# Step 1: Open this URL in browser
CLIENT_ID="your_client_id"
echo "https://accounts.spotify.com/authorize?client_id=$CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:8888/callback&scope=playlist-modify-private%20playlist-modify-public%20user-read-private"

# Step 2: After authorization, copy the code from URL and run:
CODE="your_authorization_code"
CLIENT_SECRET="your_client_secret"

curl -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(echo -n $CLIENT_ID:$CLIENT_SECRET | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=$CODE&redirect_uri=http://127.0.0.1:8888/callback"
```

---

## 📝 Step 5: Set Environment Variables

Now that you have all three credentials, set them in PowerShell:

```powershell
$env:SPOTIFY_CLIENT_ID = "your_client_id_here"
$env:SPOTIFY_CLIENT_SECRET = "your_client_secret_here"
$env:SPOTIFY_REFRESH_TOKEN = "your_refresh_token_here"
$env:ENABLE_NLP = "true"

# Verify they're set
Write-Host "Client ID: $env:SPOTIFY_CLIENT_ID"
Write-Host "Client Secret: [HIDDEN]"
Write-Host "Refresh Token: [HIDDEN]"
```

---

## 🎯 Quick Reference

### Required Scopes

Your refresh token MUST have these scopes:

- `playlist-modify-private` - Create/modify private playlists
- `playlist-modify-public` - Create/modify public playlists
- `user-read-private` - Read user profile info

### Redirect URI

Must be exactly: `http://127.0.0.1:8888/callback`
⚠️ **Note**: Use `127.0.0.1` NOT `localhost` (Spotify requirement as of 2025)

### Token Lifetime

- **Access Token**: Expires after 1 hour (auto-refreshed by the app)
- **Refresh Token**: Never expires (unless you revoke it)
- **Authorization Code**: Single-use only, expires quickly

---

## 🔧 Testing Your Credentials

Once you have all three credentials set, test them:

```powershell
# Run the MCP server
npm start

# In another PowerShell window, test the search endpoint
$body = @{
    tool = "search-track"
    input = @{
        query = "test"
    }
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3001/mcp -Body $body -ContentType 'application/json'
```

If you see search results, your credentials are working! 🎉

---

## ❌ Troubleshooting

### "Invalid client" error

- Double-check your Client ID and Client Secret
- Make sure there are no extra spaces when copying

### "Invalid redirect URI" error

- Go back to your app settings in Spotify Dashboard
- Make sure `http://127.0.0.1:8888/callback` is in the Redirect URIs list
- Make sure it's typed exactly (no trailing slash)
- Use `127.0.0.1` NOT `localhost`

### "Invalid scope" error

- Make sure your authorization URL includes all three scopes
- Revoke access and try again (see below)

### "Refresh token failed" error

- Your refresh token might be invalid
- Generate a new one following Step 4 again

### Need to Start Over?

1. Go to **https://www.spotify.com/account/apps/**
2. Find your app and click **"Remove Access"**
3. Start again from Step 4

---

## 💾 Saving Credentials Permanently

### Option 1: Environment Variables (Session Only)

The credentials set with `$env:VARIABLE = "value"` only last for that PowerShell session.

### Option 2: Create a .env File (Recommended)

Create a file named `.env` in your project root:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
ENABLE_NLP=true
```

Then load it before starting:

```powershell
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.+)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
    }
}
npm start
```

⚠️ **Add .env to .gitignore** (already done in this project)

### Option 3: Apify Actor Environment Variables

When deploying to Apify:

1. Go to your Actor settings
2. Navigate to "Environment variables"
3. Add each variable
4. Mark Client Secret and Refresh Token as "Secret"

---

## 📚 Additional Resources

- **Spotify Authorization Guide**: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
- **Spotify Scopes Reference**: https://developer.spotify.com/documentation/web-api/concepts/scopes
- **Spotify API Console**: https://developer.spotify.com/console/

---

## ✅ Checklist

- [ ] Created Spotify Developer account
- [ ] Created Spotify app
- [ ] Got Client ID
- [ ] Got Client Secret
- [ ] Added redirect URI: `http://127.0.0.1:8888/callback`
- [ ] Got authorization code from browser
- [ ] Exchanged code for refresh token
- [ ] Set environment variables
- [ ] Tested credentials with `npm start`

---

## 🎉 You're Done!

Once you have all three credentials and the server runs successfully, you're ready to use the Spotify MCP Actor!

**Next steps:**

1. Run `npm start` to start the server
2. Test with the examples in `examples.http`
3. Deploy to Apify (see `CHECKLIST.md`)

---

**Need help?** Check the main `README.md` or `SETUP.md` for more information.
