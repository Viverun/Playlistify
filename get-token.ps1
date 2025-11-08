# Exchange authorization code for refresh token
$clientId = "e7b084553d51471fbc32cb2e8a90936d"
$clientSecret = "5db1a269182b45c5ba59406192bfa704"
$code = "AQDltEja4Roo6eCfp1gbn2PUn6b84oSkLkLasaYfrsjKqbz44Utd6-opxtqBc7ZkUeoN2DukMrp9WRmXx5TfZnxOELQtTAhbIgkCIy86wttPYMMxTQgcJeifXD0n1c9q1jn-rSGj02pfFylxfSS2C40tanlTXIienVdQ0Jvsi5NKihMpp4Rcy-bI1igys0mAWCUd3PqMmXxIkmrwGjFvPihdes4eQZtxSPfLUmxXwG4Q0RjeZ6yJPpIYMu24FGe6tWhubpTP"
$redirectUri = "http://127.0.0.1:8888/callback"

# Create authorization header
$authString = "${clientId}:${clientSecret}"
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
    
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                    ✓ SUCCESS!                              ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    
    Write-Host "`nYour REFRESH TOKEN (save this!):" -ForegroundColor Yellow
    Write-Host $response.refresh_token -ForegroundColor Green
    
    Write-Host "`n✓ This is your permanent refresh token!" -ForegroundColor Cyan
    Write-Host "✓ Copy it and save it securely" -ForegroundColor Cyan
    
} catch {
    Write-Host "`n✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure your credentials and code are correct" -ForegroundColor Yellow
}
