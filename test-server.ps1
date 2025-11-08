# Test Script for Spotify MCP Server
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Testing Spotify MCP Server" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "[Test 1] Health Check..." -ForegroundColor Green
try {
    $health = Invoke-RestMethod -Method Get -Uri "http://localhost:3001/"
    Write-Host "Success: Server is healthy!" -ForegroundColor Green
    $health | ConvertTo-Json
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "[Test 2] Searching for happy tracks..." -ForegroundColor Green
try {
    $searchBody = @{
        tool = "search-track"
        input = @{
            query = "happy"
            limit = 3
        }
    } | ConvertTo-Json

    $searchResult = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body $searchBody -ContentType "application/json"
    Write-Host "Success: Search worked!" -ForegroundColor Green
    Write-Host "Results:" -ForegroundColor Cyan
    $searchResult.content | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "[Test 3] Getting recommendations..." -ForegroundColor Green
try {
    $recommendBody = @{
        tool = "recommend"
        input = @{
            genres = @("pop", "happy")
            limit = 3
        }
    } | ConvertTo-Json

    $recommendResult = Invoke-RestMethod -Method Post -Uri "http://localhost:3001/mcp" -Body $recommendBody -ContentType "application/json"
    Write-Host "Success: Got recommendations!" -ForegroundColor Green
    Write-Host "Results:" -ForegroundColor Cyan
    $recommendResult.content | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Testing Complete!" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan
