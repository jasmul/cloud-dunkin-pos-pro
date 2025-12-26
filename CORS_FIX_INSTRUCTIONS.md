# 🔧 CORS Error Fix - Complete Instructions

## 🎯 Understanding Your Error

Your error shows:
```
from origin 'null' has been blocked by CORS policy
```

**This means:** You're opening the HTML file directly (`file://` protocol), which browsers block for security reasons.

## ✅ IMMEDIATE FIX (Do This First!)

### Step 1: Start Local Web Server

Open PowerShell or Command Prompt in your project folder:

```powershell
cd frontend
npm install
npm start
```

You should see:
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://localhost:8080
```

### Step 2: Open in Browser

**CRITICAL:** Don't double-click the HTML file!

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Type in the address bar: `http://localhost:8080`
3. Click on `index.html` in the file list

### Step 3: Verify Fix

- ✅ Origin should be `http://localhost:8080` (not `null`)
- ✅ CORS errors should disappear
- ✅ Menu, orders, and inventory should load

## 🔄 Permanent Backend Fix (After Testing Locally)

Once you confirm the local server works, deploy the backend CORS fixes:

```powershell
cd backend
npm run deploy:dev
```

This will:
- Add proper OPTIONS handlers for all GET endpoints
- Ensure preflight requests are handled correctly
- Fix CORS for all API endpoints

## 📋 What Was Fixed

### Frontend
- ✅ Created `frontend/package.json` with http-server
- ✅ Added start scripts for Windows and Linux/Mac
- ✅ Updated README with local development instructions

### Backend
- ✅ Fixed CORS headers in `getInventory` handler
- ✅ Added dedicated OPTIONS handler (`handlers/cors.js`)
- ✅ Added OPTIONS methods for `getMenu`, `getOrders`, and `getInventory` in `serverless.yml`

## 🚨 Common Mistakes

1. **Opening file directly** ❌
   - Don't: Double-click `index.html`
   - Do: Use `http://localhost:8080`

2. **Forgetting to start server** ❌
   - Don't: Just open browser
   - Do: Run `npm start` first, then open browser

3. **Wrong URL** ❌
   - Don't: `file:///C:/Users/.../index.html`
   - Do: `http://localhost:8080/index.html`

## 🆘 Still Not Working?

1. **Check server is running:**
   - Look for "Available on: http://localhost:8080" in terminal
   - If not, run `npm start` again

2. **Check browser console:**
   - Press F12 to open DevTools
   - Look at Console tab
   - Origin should show `http://localhost:8080`, not `null`

3. **Try different browser:**
   - Sometimes extensions interfere
   - Try Chrome, Edge, or Firefox

4. **Check firewall:**
   - Windows Firewall might block localhost:8080
   - Allow it if prompted

## 📞 Next Steps

After the local server works:
1. Test all features (menu, orders, inventory)
2. Deploy backend fixes: `cd backend && npm run deploy:dev`
3. Test again with deployed backend
4. Everything should work! 🎉

