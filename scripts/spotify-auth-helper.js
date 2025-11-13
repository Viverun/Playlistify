/**
 * Spotify Authorization Helper
 * 
 * This script helps you get a refresh token for your Spotify app.
 * 
 * Usage:
 * 1. Replace CLIENT_ID and CLIENT_SECRET with your actual credentials
 * 2. Make sure redirect URI matches your Spotify app settings
 * 3. Run: node spotify-auth-helper.js
 * 4. Open http://localhost:8888/login in your browser
 * 5. Authorize the app
 * 6. Copy the refresh token from the terminal or browser
 */

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

// ⚠️ REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:8888/callback';

// Check if credentials are set
if (CLIENT_ID === 'YOUR_CLIENT_ID_HERE' || CLIENT_SECRET === 'YOUR_CLIENT_SECRET_HERE') {
  console.error('\n❌ Error: Please set your Spotify credentials first!');
  console.error('\nOption 1: Edit this file and replace CLIENT_ID and CLIENT_SECRET');
  console.error('Option 2: Set environment variables:');
  console.error('  SPOTIFY_CLIENT_ID=your_id SPOTIFY_CLIENT_SECRET=your_secret node spotify-auth-helper.js\n');
  process.exit(1);
}

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

// Scopes needed for your Apify actor
const scopes = [
  'playlist-modify-public',    // Create and modify public playlists
  'playlist-modify-private',   // Create and modify private playlists
  'playlist-read-private',     // Read private playlists
  'user-library-read',         // Access user's library
  'user-read-private',         // Read user profile
  'user-read-email'            // Read user email
];

const app = express();

// Step 1: Redirect to Spotify authorization
app.get('/login', (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  console.log('\n🔗 Redirecting to Spotify authorization...');
  res.redirect(authorizeURL);
});

// Step 2: Handle callback and get tokens
app.get('/callback', async (req, res) => {
  const { code, error } = req.query;
  
  if (error) {
    console.error('\n❌ Authorization failed:', error);
    return res.send(`
      <h1>❌ Authorization Failed</h1>
      <p>Error: ${error}</p>
      <p><a href="/login">Try again</a></p>
    `);
  }
  
  if (!code) {
    console.error('\n❌ No authorization code received');
    return res.send(`
      <h1>❌ No Authorization Code</h1>
      <p><a href="/login">Try again</a></p>
    `);
  }
  
  try {
    console.log('\n🔄 Exchanging authorization code for tokens...');
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ SUCCESS! Your Spotify tokens:');
    console.log('='.repeat(80));
    console.log('\n📝 Access Token (expires in ' + expires_in + ' seconds):');
    console.log(access_token);
    console.log('\n🔑 Refresh Token (SAVE THIS!):');
    console.log(refresh_token);
    console.log('\n' + '='.repeat(80));
    console.log('\n⚠️  IMPORTANT: Copy the REFRESH TOKEN above');
    console.log('   Use it in your Apify actor configuration as SPOTIFY_REFRESH_TOKEN');
    console.log('='.repeat(80) + '\n');
    
    // Test the tokens
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    
    try {
      const me = await spotifyApi.getMe();
      console.log('✅ Token test successful!');
      console.log('   User:', me.body.display_name || me.body.id);
      console.log('   Email:', me.body.email || 'N/A');
      console.log('');
    } catch (testError) {
      console.warn('⚠️  Warning: Could not test token:', testError.message);
    }
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Spotify Authorization Success</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #1db954 0%, #191414 100%);
            color: white;
            line-height: 1.6;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
          }
          h1 { color: #1db954; }
          .token-box {
            background: #000;
            padding: 20px;
            border-radius: 10px;
            font-family: monospace;
            word-break: break-all;
            margin: 20px 0;
            border: 2px solid #1db954;
          }
          .success { color: #1db954; font-size: 3rem; }
          .warning { 
            background: #ff9800;
            color: #000;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-weight: bold;
          }
          button {
            background: #1db954;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          }
          button:hover {
            background: #1ed760;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">✅</div>
          <h1>Authorization Successful!</h1>
          
          <div class="warning">
            ⚠️ IMPORTANT: Save your refresh token! You need it for your Apify actor.
          </div>
          
          <h3>🔑 Your Refresh Token:</h3>
          <div class="token-box" id="refreshToken">${refresh_token}</div>
          <button onclick="copyToken()">📋 Copy Refresh Token</button>
          
          <h3>📋 Next Steps:</h3>
          <ol>
            <li>Copy the refresh token above (or from the terminal)</li>
            <li>Go to your Apify actor settings</li>
            <li>Add/update environment variables:
              <ul>
                <li><strong>SPOTIFY_CLIENT_ID</strong> = ${CLIENT_ID}</li>
                <li><strong>SPOTIFY_CLIENT_SECRET</strong> = ${CLIENT_SECRET.substring(0, 10)}...</li>
                <li><strong>SPOTIFY_REFRESH_TOKEN</strong> = (paste the token above)</li>
              </ul>
            </li>
            <li>Mark all three as "Secret" in Apify</li>
            <li>Rebuild your actor</li>
            <li>Test it!</li>
          </ol>
          
          <p style="opacity: 0.7; margin-top: 40px;">
            You can close this window now. The tokens are also shown in your terminal.
          </p>
        </div>
        
        <script>
          function copyToken() {
            const token = document.getElementById('refreshToken').textContent;
            navigator.clipboard.writeText(token).then(() => {
              alert('✅ Refresh token copied to clipboard!');
            }).catch(err => {
              alert('❌ Failed to copy. Please copy manually from the box above.');
            });
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('\n❌ Error getting tokens:', error.message);
    console.error('\nFull error:', error);
    
    res.send(`
      <h1>❌ Error Getting Tokens</h1>
      <p>Error: ${error.message}</p>
      <p>This usually means your Client ID or Secret is incorrect.</p>
      <p>Please check your credentials and try again.</p>
      <p><a href="/login">Try again</a></p>
    `);
  }
});

// Home page with instructions
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Spotify Authorization Helper</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #1db954 0%, #191414 100%);
          color: white;
          line-height: 1.6;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
        }
        h1 { color: #1db954; }
        button, a.button {
          background: #1db954;
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 18px;
          text-decoration: none;
          display: inline-block;
          margin: 20px 0;
        }
        button:hover, a.button:hover {
          background: #1ed760;
        }
        .code {
          background: #000;
          padding: 15px;
          border-radius: 10px;
          font-family: monospace;
          margin: 15px 0;
        }
        .warning {
          background: rgba(255, 152, 0, 0.2);
          border-left: 4px solid #ff9800;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎵 Spotify Authorization Helper</h1>
        <p>This tool helps you get a refresh token for your Spotify app.</p>
        
        <div class="warning">
          <strong>⚠️ Before you start:</strong><br>
          Make sure you've added this redirect URI to your Spotify app:<br>
          <code>http://localhost:8888/callback</code>
        </div>
        
        <h3>📋 Instructions:</h3>
        <ol>
          <li>Click the button below to start authorization</li>
          <li>Log in with your Spotify account</li>
          <li>Authorize the application</li>
          <li>Copy the refresh token</li>
          <li>Use it in your Apify actor</li>
        </ol>
        
        <a href="/login" class="button">🚀 Start Authorization</a>
        
        <h3>🔐 Current Configuration:</h3>
        <div class="code">
          Client ID: ${CLIENT_ID}<br>
          Client Secret: ${CLIENT_SECRET.substring(0, 10)}...<br>
          Redirect URI: ${REDIRECT_URI}
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(80));
  console.log('🎵 Spotify Authorization Helper');
  console.log('='.repeat(80));
  console.log('\n📋 Configuration:');
  console.log('   Client ID:', CLIENT_ID);
  console.log('   Client Secret:', CLIENT_SECRET.substring(0, 10) + '...');
  console.log('   Redirect URI:', REDIRECT_URI);
  console.log('\n🚀 Server started on http://localhost:' + PORT);
  console.log('\n📝 Next steps:');
  console.log('   1. Open this URL in your browser:');
  console.log('      \x1b[36mhttp://localhost:' + PORT + '/login\x1b[0m');
  console.log('   2. Log in with your Spotify account');
  console.log('   3. Authorize the app');
  console.log('   4. Copy the refresh token');
  console.log('\n⚠️  Make sure http://localhost:8888/callback is in your');
  console.log('   Spotify app\'s redirect URIs!');
  console.log('='.repeat(80) + '\n');
});
