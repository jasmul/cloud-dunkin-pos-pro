# How to Share Your Cloud Dunkin' POS Pro Website

## 🚀 Quick Deployment Options

### Option 1: AWS S3 + CloudFront (Recommended for Cloud Assignment)

This is the **best option** for your cloud-backed assignment as it demonstrates AWS services.

#### Step 1: Deploy Infrastructure
```bash
cd infrastructure/terraform
terraform init
terraform apply
```

**Note:** You'll need to:
- Create an S3 bucket for Terraform state (or comment out the backend block)
- Have AWS credentials configured (`aws configure`)

#### Step 2: Deploy Frontend to S3
```bash
# Get bucket name from Terraform output
aws s3 sync frontend/ s3://dunkin-pos-frontend-dev/ --delete

# Get CloudFront distribution ID from Terraform output
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Step 3: Share Your CloudFront URL
After deployment, Terraform will output your CloudFront URL:
```
cloudfront_url = "https://d1234567890abc.cloudfront.net"
```

**Share this URL** - it's your live website!

---

### Option 2: GitHub Pages (Easiest - Free)

Perfect for quick sharing without AWS setup.

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **main branch** and **/ (root)**
4. Click **Save**

#### Step 3: Share Your GitHub Pages URL
Your site will be available at:
```
https://YOUR_USERNAME.github.io/cloud-dunkin-pos-pro/
```

**Note:** Update `CLOUD_CONFIG.API_ENDPOINT` in `index.html` to your API Gateway URL if using cloud backend.

---

### Option 3: Netlify (Free & Easy)

Great for continuous deployment.

#### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

#### Step 2: Deploy
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect your GitHub repository
3. Set build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `frontend`
4. Click **"Deploy site"**

#### Step 3: Share Your Netlify URL
Your site will be at:
```
https://your-site-name.netlify.app
```

---

### Option 4: Vercel (Free & Fast)

Excellent for modern web apps.

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

Follow the prompts, and your site will be live!

---

### Option 5: AWS Amplify (AWS Native)

Good if you want everything in AWS.

#### Step 1: Create Amplify App
1. Go to AWS Amplify Console
2. Click **"New app"** → **"Host web app"**
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `frontend`

#### Step 2: Deploy
Amplify will automatically deploy and give you a URL.

---

### Option 6: Share Locally (For Testing)

For sharing on your local network:

#### Using Python (if installed):
```bash
cd frontend
python -m http.server 8000
```

#### Using Node.js (if installed):
```bash
cd frontend
npx http-server -p 8000
```

Then share your local IP:
```
http://YOUR_LOCAL_IP:8000
```

Find your IP:
- Windows: `ipconfig` → Look for IPv4 Address
- Mac/Linux: `ifconfig` or `ip addr`

---

## 📋 Pre-Deployment Checklist

Before sharing, make sure to:

### 1. Update API Endpoint (if using cloud backend)
Edit `frontend/index.html` and update:
```javascript
const CLOUD_CONFIG = {
    API_ENDPOINT: "https://YOUR_ACTUAL_API_GATEWAY_URL.execute-api.us-east-1.amazonaws.com/dev",
    REGION: "us-east-1"
};
```

### 2. Test Locally First
```bash
# Open frontend/index.html in browser
# Or use a local server:
cd frontend
python -m http.server 8000
# Visit http://localhost:8000
```

### 3. Remove Sensitive Data
- Remove any hardcoded credentials
- Use environment variables for API keys
- Check `.gitignore` is working

### 4. Optimize for Production
- Minify CSS/JS (optional)
- Compress images (if any)
- Enable HTTPS (most platforms do this automatically)

---

## 🎯 Recommended Approach for Your Assignment

**For Cloud Assignment:**
1. ✅ Deploy to **AWS S3 + CloudFront** (shows cloud infrastructure)
2. ✅ Deploy backend to **AWS Lambda** (shows serverless)
3. ✅ Document the architecture
4. ✅ Share CloudFront URL

**For Quick Demo:**
1. ✅ Use **GitHub Pages** (fastest, free)
2. ✅ Or **Netlify** (easiest with auto-deploy)

---

## 🔗 Sharing Your Live Site

Once deployed, you can share:

1. **Direct URL** - Send the CloudFront/GitHub Pages URL
2. **QR Code** - Generate QR code for the URL
3. **Embed** - Embed in presentations/documents
4. **Demo Video** - Record a screen capture showing the site

---

## 📝 Example Deployment Commands

### Complete AWS Deployment:
```bash
# 1. Deploy infrastructure
cd infrastructure/terraform
terraform init
terraform apply

# 2. Note the outputs:
# - S3 bucket name
# - CloudFront distribution ID

# 3. Deploy frontend
cd ../../frontend
aws s3 sync . s3://dunkin-pos-frontend-dev/ --delete

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"

# 5. Get your URL
aws cloudfront list-distributions \
  --query "DistributionList.Items[*].[Id,DomainName]" \
  --output table
```

### GitHub Pages Deployment:
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy POS application"
git push origin main

# 2. Enable Pages in GitHub Settings
# 3. Share: https://YOUR_USERNAME.github.io/cloud-dunkin-pos-pro/
```

---

## 🆘 Troubleshooting

### Issue: Site not loading
- Check browser console for errors
- Verify API endpoint is correct
- Check CORS settings if using cloud backend

### Issue: Changes not showing
- Clear browser cache
- Invalidate CloudFront cache (if using AWS)
- Wait a few minutes for CDN propagation

### Issue: API calls failing
- Verify API Gateway is deployed
- Check CORS configuration
- Verify authentication tokens (if using)

---

## 📞 Need Help?

- **AWS Issues:** Check CloudWatch logs
- **GitHub Pages:** Check repository settings
- **Netlify/Vercel:** Check deployment logs in dashboard

---

**Your site is ready to share! 🎉**

