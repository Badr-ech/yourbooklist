# 🚀 Deployment Guide: YourBookList on Vercel

This guide will walk you through deploying YourBookList to Vercel for your portfolio.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] GitHub repository with your code
- [ ] Firebase project set up
- [ ] Google Books API key
- [ ] Google AI API key (for Genkit recommendations)
- [ ] Vercel account ([Sign up here](https://vercel.com/signup))

---

## 🔧 Step 1: Prepare Your Firebase Project

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Follow the setup wizard

### 1.2 Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method

### 1.3 Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose production mode or test mode
4. Select a location close to your users

### 1.4 Deploy Security Rules

Deploy the security rules from `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

Or copy and paste the rules directly in the Firebase Console.

### 1.5 Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click "Web" icon to add web app (if not already added)
4. Copy the configuration values (you'll need these for Vercel)

---

## 🔑 Step 2: Get API Keys

### 2.1 Google Books API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Books API**:
   - Go to APIs & Services → Library
   - Search for "Books API"
   - Click Enable
4. Create credentials:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → API Key
   - Copy your API key
5. **Restrict the API key** (recommended):
   - Click on the key to edit
   - Under "API restrictions", select "Restrict key"
   - Choose "Books API"
   - Under "Website restrictions", add your Vercel domain

### 2.2 Google AI API Key (Genkit)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Select your Google Cloud project
4. Copy the generated API key

---

## 🚀 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `yourbooklist` directory as the root

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: `yourbooklist`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Add Environment Variables**
   
   Click "Environment Variables" and add:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_google_books_key
   GOOGLE_GENAI_API_KEY=your_google_ai_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd yourbooklist
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? (yourbooklist)
   - Directory? (./yourbooklist or . if already in subdirectory)
   - Override settings? No

5. **Add Environment Variables**
   
   Either via the dashboard or CLI:
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
   vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
   vercel env add NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
   vercel env add GOOGLE_GENAI_API_KEY
   ```

6. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

---

## 🔒 Step 4: Configure Firebase for Production

### 4.1 Add Authorized Domain

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings**
4. Scroll to **Authorized domains**
5. Click "Add domain"
6. Add your Vercel domain: `your-project.vercel.app`

### 4.2 Update Firestore Security Rules

Ensure your `firestore.rules` are production-ready:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Books collection
    match /books/{bookId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Add more rules as needed
  }
}
```

---

## 🎨 Step 5: Customize for Your Portfolio

### 5.1 Update README

Update the README.md with your live demo link:

```markdown
> 🚀 **Live Demo:** https://your-project.vercel.app
```

### 5.2 Add Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 5.3 Add Analytics (Optional)

Vercel provides built-in analytics:

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable analytics

---

## ✅ Step 6: Test Your Deployment

1. **Visit your deployed URL**
2. **Test key features:**
   - [ ] Landing page loads correctly
   - [ ] Sign up / Login works
   - [ ] Book search returns results
   - [ ] Dashboard displays correctly
   - [ ] Can add books to library
   - [ ] AI recommendations work (if API key is set)

3. **Check browser console for errors**
4. **Test on mobile devices**

---

## 🐛 Troubleshooting

### Build Fails

**Problem:** TypeScript or ESLint errors during build

**Solution:** The project is configured to ignore these errors. If you want to fix them:
1. Run `npm run typecheck` locally
2. Fix reported errors
3. Update `next.config.ts` to remove `ignoreBuildErrors: true`

### Firebase Connection Error

**Problem:** "Firebase: Error (auth/invalid-api-key)"

**Solution:** 
- Double-check environment variables in Vercel
- Ensure no extra spaces in values
- Redeploy after updating variables

### Books Not Loading

**Problem:** Google Books API not returning results

**Solution:**
- Verify `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY` is set correctly
- Check API key restrictions in Google Cloud Console
- Ensure Books API is enabled

### AI Recommendations Not Working

**Problem:** AI recommendations fail or return errors

**Solution:**
- Verify `GOOGLE_GENAI_API_KEY` is set (without `NEXT_PUBLIC_` prefix)
- Check API key is valid at Google AI Studio
- Review Vercel function logs for error details

---

## 📊 Step 7: Monitor Your Application

### Vercel Dashboard

- **Deployments:** View deployment history and logs
- **Analytics:** Track visitors and performance
- **Functions:** Monitor serverless function usage

### Firebase Console

- **Authentication:** Track user signups
- **Firestore:** Monitor database usage
- **Usage & Billing:** Check quota usage

---

## 🎉 You're Live!

Your YourBookList application is now deployed and ready to showcase in your portfolio!

### Next Steps

- [ ] Share your deployment URL on social media
- [ ] Add project to your portfolio website
- [ ] Update GitHub README with live demo link
- [ ] Consider implementing additional features from `docs/feature-roadmap.md`

### Keeping It Updated

To deploy updates:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically deploy your changes!

---

**Need Help?**

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

*Happy deploying!* 🚀
