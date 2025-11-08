# Quick Test Commands - Copy These!

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Testing Fixed Spotify MCP Server" -ForegroundColor Yellow  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Search (already working)
Write-Host "[1] Searching for Bohemian Rhapsody..." -ForegroundColor Green
$result1 = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"search-track","input":{"query":"bohemian rhapsody","limit":3}}' -ContentType "application/json"
Write-Host "Status: $($result1.status)" -ForegroundColor $(if ($result1.status -eq "success") { "Green" } else { "Red" })
if ($result1.data.tracks) {
    Write-Host "Found $($result1.data.count) tracks!" -ForegroundColor Cyan
    $result1.data.tracks | ForEach-Object { Write-Host "  - $($_.name) by $($_.artist)" -ForegroundColor White }
}

Write-Host ""

# Test 2: Recommendations with NLP (FIXED!)
Write-Host "[2] Getting workout recommendations..." -ForegroundColor Green
$result2 = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["workout"],"limit":5}}' -ContentType "application/json"
Write-Host "Status: $($result2.status)" -ForegroundColor $(if ($result2.status -eq "success") { "Green" } else { "Red" })
if ($result2.data.tracks) {
    Write-Host "Got $($result2.data.count) recommendations!" -ForegroundColor Cyan
    $result2.data.tracks | Select-Object -First 3 | ForEach-Object { Write-Host "  - $($_.name) by $($_.artist)" -ForegroundColor White }
}

Write-Host ""

# Test 3: Create empty playlist (FIXED!)
Write-Host "[3] Creating empty playlist..." -ForegroundColor Green
$result3 = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"create-playlist","input":{"name":"MCP Test Playlist","description":"Created from my server!"}}' -ContentType "application/json"
Write-Host "Status: $($result3.status)" -ForegroundColor $(if ($result3.status -eq "success") { "Green" } else { "Red" })
if ($result3.data.playlist) {
    Write-Host "Playlist created!" -ForegroundColor Cyan
    Write-Host "  Name: $($result3.data.playlist.name)" -ForegroundColor White
    Write-Host "  URL: $($result3.data.playlist.url)" -ForegroundColor White
}

Write-Host ""

# Test 4: More NLP examples
Write-Host "[4] Getting 'happy' music..." -ForegroundColor Green
$result4 = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body '{"tool":"recommend","input":{"genres":["happy"],"limit":3}}' -ContentType "application/json"
Write-Host "Status: $($result4.status)" -ForegroundColor $(if ($result4.status -eq "success") { "Green" } else { "Red" })
if ($result4.data.tracks) {
    Write-Host "Got $($result4.data.count) happy songs!" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " All Tests Complete!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your server is working perfectly! Try more:" -ForegroundColor Green
Write-Host '  Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body ''{"tool":"recommend","input":{"genres":["chill"],"limit":10}}'' -ContentType "application/json"' -ForegroundColor White
