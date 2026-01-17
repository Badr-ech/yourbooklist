# 📚 YourBookList

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Badr-ech/yourbooklist)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 **Live Demo:** [Coming Soon - Deploy your own!]

YourBookList is a modern web application for book lovers to organize, track, and discover books. Inspired by platforms like Goodreads and MyAnimeList, it offers a rich set of features for personal book management, social connections, and smart recommendations.

## 🚀 Features

- 📖 Personal book library with status tracking (Plan to Read, Reading, Completed)
- ⭐ Custom book ratings and reviews
- 📊 Reading goals and statistics
- 🔍 Advanced search and genre-based browsing
- 🤖 AI-powered book recommendations (powered by Google Gemini 2.0 Flash)
- 👥 User profiles with bios and favorite genres
- 🔗 Follow system for social connections
- 📰 Book news and updates
- 🎨 Theme system and responsive design

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Backend:** Firebase (Auth, Firestore)
- **AI:** Google Genkit (Gemini 2.0 Flash)
- **APIs:** Google Books API
- **Deployment:** Vercel

## 📂 Project Structure

```
yourbooklist/
├── src/
│   ├── app/              # Next.js app pages and routes
│   │   ├── page.tsx      # Landing page
│   │   ├── dashboard/    # User dashboard
│   │   ├── search/       # Book search
│   │   ├── profile/      # User profiles
│   │   └── ...
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities, types, Firebase config
│   ├── hooks/            # Custom React hooks
│   └── ai/               # AI/Genkit integration
├── docs/                 # Blueprints and feature roadmap
├── .env.example          # Environment variables template
└── vercel.json           # Vercel deployment config
```

## ⚡ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project ([Create one here](https://console.firebase.google.com/))
- Google Books API key ([Get it here](https://console.cloud.google.com/apis/credentials))
- Google AI API key for Genkit ([Get it here](https://aistudio.google.com/app/apikey))

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Badr-ech/yourbooklist.git
   cd yourbooklist/yourbooklist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Copy `.env.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google Books API
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

   # Google AI (Genkit)
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```

4. **Configure Firebase:**
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Deploy security rules from `firestore.rules`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:9002](http://localhost:9002) in your browser.**

### Running AI Features

To use AI-powered recommendations locally:

```bash
# Start Genkit development server
npm run genkit:dev

# Or with file watching
npm run genkit:watch
```

## 🚀 Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Badr-ech/yourbooklist)

### Option 2: Manual Deploy

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   cd yourbooklist
   vercel
   ```

4. **Set environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from `.env.example`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY`
     - `GOOGLE_GENAI_API_KEY`

5. **Redeploy after adding environment variables:**
   ```bash
   vercel --prod
   ```

### Firebase Configuration for Production

After deploying, add your Vercel domain to Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Authentication → Settings → Authorized domains
4. Add your Vercel deployment URL (e.g., `your-app.vercel.app`)

## 🧪 Available Scripts

- `npm run dev` - Start development server (port 9002)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## 📝 Contributing

Contributions are welcome! Please see the [feature-roadmap.md](docs/feature-roadmap.md) for ideas and open issues. To contribute:

1. Fork the repo and create a new branch
2. Make your changes and add tests if needed
3. Run `npm run typecheck` and `npm run lint`
4. Submit a pull request with a clear description

## 🔒 Security Notes

- Never commit `.env.local` or any file containing API keys
- Firebase API keys can be public for web apps, but ensure:
  - Authentication is properly configured
  - Firestore security rules are restrictive
  - Authorized domains are set in Firebase Console
- Regenerate API keys if accidentally committed to version control

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Firebase](https://firebase.google.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- Book data from [Google Books API](https://developers.google.com/books)

---

*Happy reading and building!* 📚✨

**Made with ❤️ by [Badr-ech](https://github.com/Badr-ech)**
