# ✅ Vercel Deployment Checklist

Quick reference checklist for deploying YourBookList to Vercel.

## Before You Start

- [ ] Code is committed and pushed to GitHub
- [ ] You have a Vercel account
- [ ] Firebase project is set up
- [ ] All API keys are ready

---

## 🔑 API Keys Needed

Gather these before deploying:

### Firebase (from Firebase Console → Project Settings)
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

### Google APIs
- [ ] `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY` (from Google Cloud Console)
- [ ] `GOOGLE_GENAI_API_KEY` (from Google AI Studio)

---

## 📝 Deployment Steps

### 1. Import to Vercel
- [ ] Go to vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repo
- [ ] Set root directory to `yourbooklist`

### 2. Configure Environment Variables
- [ ] Click "Environment Variables" in Vercel
- [ ] Add all 8 environment variables listed above
- [ ] Make sure values have no extra spaces

### 3. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (usually 2-3 minutes)
- [ ] Copy your deployment URL

### 4. Configure Firebase
- [ ] Go to Firebase Console
- [ ] Authentication → Settings → Authorized domains
- [ ] Add your Vercel domain: `your-app.vercel.app`

### 5. Test Everything
- [ ] Visit your deployed site
- [ ] Test sign up/login
- [ ] Search for books
- [ ] Add a book to your library
- [ ] Check AI recommendations

---

## 🎯 Quick Deploy Commands (CLI Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd yourbooklist
vercel

# Add environment variables (do this for each one)
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY

# Deploy to production
vercel --prod
```

---

## 🚨 Common Issues

**Build fails?**
→ Check Vercel deployment logs for specific errors

**Firebase auth not working?**
→ Add your Vercel domain to Firebase authorized domains

**Books not loading?**
→ Check Google Books API key is correct and API is enabled

**AI recommendations failing?**
→ Verify `GOOGLE_GENAI_API_KEY` (no `NEXT_PUBLIC_` prefix)

---

## 📱 After Deployment

- [ ] Update README.md with live demo link
- [ ] Test on mobile devices
- [ ] Share on LinkedIn/Twitter
- [ ] Add to your portfolio website
- [ ] Monitor Vercel analytics

---

## 🔄 Future Updates

To deploy changes:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel automatically deploys on push! 🎉

---

**Full guide:** See `DEPLOYMENT.md` for detailed instructions.

**Deployment time:** ~5-10 minutes for first deployment
