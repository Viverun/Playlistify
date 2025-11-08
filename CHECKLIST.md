# 🎯 Spotify MCP Actor - Complete Deployment Checklist

Use this checklist to ensure your Actor is fully configured and ready for production deployment.

## 📋 Pre-Deployment Checklist

### ✅ Environment Setup

- [ ] Node.js 16+ installed
- [ ] npm installed and working
- [ ] Git installed (optional, for version control)
- [ ] VS Code or preferred editor set up

### ✅ Dependencies

- [ ] Run `npm install` successfully
- [ ] All packages installed without errors
- [ ] TypeScript compiles (`npm run build`)
- [ ] No critical TypeScript errors

### ✅ Spotify Configuration

- [ ] Created Spotify Developer account
- [ ] Created Spotify app in dashboard
- [ ] Have Client ID
- [ ] Have Client Secret
- [ ] Generated Refresh Token with correct scopes:
  - [ ] `playlist-modify-private`
  - [ ] `playlist-modify-public`
  - [ ] `user-read-private`

### ✅ Environment Variables

- [ ] `SPOTIFY_CLIENT_ID` set
- [ ] `SPOTIFY_CLIENT_SECRET` set
- [ ] `SPOTIFY_REFRESH_TOKEN` set
- [ ] `ENABLE_NLP` set (optional, default: false)
- [ ] `PORT` set (optional, default: 3001)

### ✅ Local Testing

- [ ] Server starts without errors (`npm start`)
- [ ] Health endpoint works (`GET http://localhost:3001/`)
- [ ] Search tool works
- [ ] Recommend tool works
- [ ] Create playlist tool works
- [ ] Stats endpoint works (`GET http://localhost:3001/stats`)
- [ ] Rate limiting works (test with rapid requests)
- [ ] NLP parsing works (if enabled)
- [ ] Cache is functioning (check stats)

### ✅ Code Quality

- [ ] No console errors in logs
- [ ] TypeScript compilation warnings reviewed
- [ ] All features tested manually
- [ ] Tests pass (`npm test`)
- [ ] No hardcoded credentials in code
- [ ] `.gitignore` configured properly

### ✅ Documentation

- [ ] README.md reviewed and accurate
- [ ] SETUP.md instructions tested
- [ ] examples.http requests work
- [ ] Environment variables documented

## 🚀 Apify Deployment Checklist

### ✅ Apify Account

- [ ] Apify account created
- [ ] Billing information configured (if needed)
- [ ] API token generated (for CLI deployment)

### ✅ Actor Configuration

- [ ] Actor created in Apify Console
- [ ] Actor name set
- [ ] Actor description added
- [ ] Source code uploaded/linked
- [ ] Environment variables configured in Actor settings:
  - [ ] `SPOTIFY_CLIENT_ID`
  - [ ] `SPOTIFY_CLIENT_SECRET`
  - [ ] `SPOTIFY_REFRESH_TOKEN`
  - [ ] `ENABLE_NLP`

### ✅ Build & Deploy

- [ ] Actor builds successfully
- [ ] No build errors
- [ ] Build output reviewed
- [ ] Dockerfile builds correctly (if using Docker)

### ✅ Post-Deployment Testing

- [ ] Actor runs in standby mode
- [ ] Health endpoint accessible via Apify URL
- [ ] MCP endpoint accessible
- [ ] Search functionality works on deployed Actor
- [ ] Recommendations work on deployed Actor
- [ ] Playlist creation works on deployed Actor
- [ ] Logs are visible in Apify Console
- [ ] Stats endpoint accessible

### ✅ Production Readiness

- [ ] Rate limiting enabled
- [ ] Caching configured
- [ ] Error handling tested
- [ ] Token refresh tested
- [ ] Billing/charging works (Actor.charge)
- [ ] Performance is acceptable
- [ ] Memory usage is reasonable

## 📊 Monitoring Setup

### ✅ Metrics to Monitor

- [ ] Request count per tool
- [ ] Error rate
- [ ] Response times
- [ ] Cache hit rate
- [ ] Rate limit violations
- [ ] Token refresh failures
- [ ] Memory usage
- [ ] Billing events

### ✅ Alerts (Optional)

- [ ] Error rate threshold alert
- [ ] High memory usage alert
- [ ] Failed token refresh alert
- [ ] Rate limit exceeded alert

## 🔒 Security Checklist

### ✅ Credentials

- [ ] No credentials in source code
- [ ] All credentials in environment variables
- [ ] Refresh token is private and secure
- [ ] Client secret is marked as secret in Apify

### ✅ API Security

- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Error messages don't leak sensitive data
- [ ] CORS configured (if needed)

### ✅ Best Practices

- [ ] HTTPS used for production endpoints
- [ ] Dependencies up to date
- [ ] Known vulnerabilities checked (`npm audit`)

## 📝 Documentation Checklist

### ✅ User Documentation

- [ ] README.md complete
- [ ] API reference documented
- [ ] Example requests provided
- [ ] Error codes documented
- [ ] Setup instructions clear

### ✅ Developer Documentation

- [ ] Code comments added
- [ ] Architecture documented
- [ ] Configuration options explained
- [ ] Troubleshooting guide included

## 🎓 Final Verification

### Run These Commands

```pwsh
# 1. Install and build
npm install
npm run build

# 2. Run tests
npm test

# 3. Start server
npm start

# 4. In another terminal, test endpoints
# Health check
curl http://localhost:3001/

# Search
curl -X POST http://localhost:3001/mcp -H "Content-Type: application/json" -d "{\"tool\":\"search-track\",\"input\":{\"query\":\"test\"}}"

# Stats
curl http://localhost:3001/stats
```

### ✅ All Tests Pass

- [ ] Health check returns 200
- [ ] Search returns results
- [ ] Stats show data
- [ ] No errors in console

## 🎉 Ready to Deploy!

Once all items are checked:

1. ✅ Commit your code (if using Git)
2. ✅ Deploy to Apify
3. ✅ Test deployed Actor
4. ✅ Monitor for first few hours
5. ✅ Share with users!

## 📞 Need Help?

- **Spotify API Issues**: Check https://developer.spotify.com/documentation/web-api
- **Apify Issues**: Check https://docs.apify.com/
- **TypeScript Errors**: Run `npm install` again
- **Token Issues**: Regenerate refresh token with correct scopes

---

## Common Issues & Solutions

### Issue: "Cannot find module 'apify'"

**Solution**: Run `npm install`

### Issue: "Spotify authentication failed"

**Solution**: Verify credentials and refresh token validity

### Issue: "Port already in use"

**Solution**: Change PORT environment variable or kill existing process

### Issue: TypeScript compilation errors

**Solution**: These are warnings about missing packages - they're expected before `npm install`

### Issue: Rate limit exceeded during testing

**Solution**: Wait a few seconds or adjust `RATE_LIMIT_MAX_TOKENS` higher

---

Last Updated: November 8, 2025
Version: 0.1.0
