#!/bin/bash
# Quick script to prepare for GitHub Pages deployment

echo "🚀 Preparing for GitHub Pages deployment..."

# Option 1: Copy index.html to root
cp frontend/index.html index.html

# Option 2: Or create a symlink (if on Mac/Linux)
# ln -s frontend/index.html index.html

echo "✅ Done! Now:"
echo "1. Commit and push: git add . && git commit -m 'Deploy' && git push"
echo "2. Go to GitHub Settings → Pages"
echo "3. Select 'main' branch and '/' folder"
echo "4. Your site will be at: https://YOUR_USERNAME.github.io/cloud-dunkin-pos-pro/"

