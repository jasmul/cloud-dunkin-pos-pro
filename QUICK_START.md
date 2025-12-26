# 🚀 Quick Start Guide - Fix CORS Errors

## ⚠️ The Problem

You're seeing CORS errors because you're opening `index.html` directly from the file system (`file://` protocol). Browsers block cross-origin requests from `file://` for security reasons.

**Error you're seeing:**
```
from origin 'null' has been blocked by CORS policy
```

The `'null'` origin means `file://` protocol.

## ✅ The Solution - Use a Local Web Server

### Step 1: Install Frontend Dependencies

Open a terminal in the project root and run:

```bash
cd frontend
npm install
```

### Step 2: Start the Local Server

```bash
npm start
```

You should see:
```
Starting up http-server, serving ./
Available on:
  http://localhost:8080
```

### Step 3: Open in Browser

**IMPORTANT:** Don't open the HTML file directly. Instead:

1. Open your web browser
2. Navigate to: **`http://localhost:8080`**
3. Click on `index.html` in the file list, or go directly to: **`http://localhost:8080/index.html`**

### Step 4: Verify It Works

- The CORS errors should be gone
- Your menu, orders, and inventory should load from AWS
- The origin will show as `http://localhost:8080` instead of `null`

## 🔄 Alternative Methods

### Using Python (if you don't have Node.js)

```bash
cd frontend
python -m http.server 8080
```

Then open: `http://localhost:8080`

### Using the Start Scripts

- **Windows:** Double-click `frontend/start-server.bat`
- **Linux/Mac:** Run `./frontend/start-server.sh`

## 🛠️ Backend CORS Fix (After Local Server Works)

Once you confirm the local server fixes the issue, you'll need to redeploy your backend to AWS with the updated CORS configuration:

```bash
cd backend
npm run deploy:dev
```

This will update your API Gateway with proper OPTIONS handlers for all endpoints.

## ❓ Still Having Issues?

1. **Make sure you're using `http://localhost:8080`** - not `file://`
2. **Check the browser console** - the origin should be `http://localhost:8080`, not `null`
3. **Verify the server is running** - you should see the server output in your terminal
4. **Try a different browser** - sometimes browser extensions can interfere

## 📝 Notes

- The local server only serves your frontend files
- API calls still go to your AWS backend (`https://izr5wkzc0a.execute-api.us-east-1.amazonaws.com/dev`)
- The backend CORS configuration allows requests from any origin (`*`), including `localhost`

