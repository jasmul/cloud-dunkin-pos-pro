# 🚀 Quick Deploy Guide - Share Your Website in 5 Minutes

## Fastest Method: GitHub Pages

### Step 1: Prepare Files
```bash
# Copy frontend file to root (for GitHub Pages)
cp frontend/index.html index.html

# Or if you prefer, keep it in frontend folder and set Pages to use /frontend
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to: `https://github.com/YOUR_USERNAME/cloud-dunkin-pos-pro/settings/pages`
2. Under "Source":
   - Select **"Deploy from a branch"**
   - Branch: **main**
   - Folder: **/ (root)** or **/frontend** (depending on where index.html is)
3. Click **Save**

### Step 4: Wait 2-3 minutes, then visit:
```
https://YOUR_USERNAME.github.io/cloud-dunkin-pos-pro/
```

---

## Alternative: Netlify (Even Easier!)

### Step 1: Go to netlify.com
### Step 2: Click "Add new site" → "Import from Git"
### Step 3: Connect GitHub → Select your repo
### Step 4: Settings:
- **Build command:** (leave empty)
- **Publish directory:** `frontend`
### Step 5: Click "Deploy"
### Done! Your site is live at: `https://random-name.netlify.app`

---

## For Cloud Assignment: AWS Deployment

### Quick AWS Deploy:
```bash
# 1. Deploy infrastructure
cd infrastructure/terraform
terraform init
terraform apply

# 2. Note the S3 bucket name from output

# 3. Deploy frontend
cd ../../frontend
aws s3 sync . s3://YOUR_BUCKET_NAME/ --delete

# 4. Get CloudFront URL from Terraform output
```

---

## Share Locally (For Testing)

```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
# Share: http://YOUR_IP:8000
```

---

**That's it! Your website is now shareable! 🎉**

