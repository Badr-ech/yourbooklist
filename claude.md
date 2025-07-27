# YourBookList - Context File for Claude

## Project Overview
**YourBookList** is a modern web application for book lovers to organize their reading life. It's a comprehensive book tracking and recommendation platform built with Next.js, Firebase, and AI-powered features.

## Technology Stack
- **Frontend**: Next.js 15.3.3, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system, Radix UI components
- **Backend**: Firebase (Authentication, Firestore Database)
- **AI**: Google Genkit with Gemini 2.0 Flash for book recommendations
- **APIs**: Google Books API for book search
- **Deployment**: Firebase App Hosting
- **Development**: Turbopack for fast development

## Architecture & Structure

### Core Directories
```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                   # Utilities, types, Firebase config
├── hooks/                 # Custom React hooks
└── ai/                    # AI/Genkit integration
```

### Key Pages & Features
1. **Landing Page** (`/`) - Marketing homepage with feature showcase
2. **Authentication** (`/login`, `/signup`) - Firebase Auth with email/password and Google OAuth
3. **Dashboard** (`/dashboard`) - Main user interface showing book collections with filtering/sorting
4. **Search** (`/search`) - Google Books API integration for discovering new books
5. **Recommendations** (`/recommendations`) - AI-powered book suggestions using Genkit
6. **Profile** (`/profile`) - User profile and preferences
7. **News** (`/news`) - Book-related news and updates

## Design System & Theming

### Color Palette
- **Primary**: Deep slate blue (#4369B2) - wisdom, trust, confidence
- **Background**: Light gray (#F0F2F5) - neutral, readable backdrop
- **Accent**: Warm coral (#FF7F50) - vibrancy for highlights
- **Typography**: Inter font for body and headlines

### UI Components
- Built on Radix UI primitives for accessibility
- Custom component library in `src/components/ui/`
- Responsive design with mobile-first approach
- Shadcn/ui component system integration

## Data Models & Types

### Book Type (`src/lib/types.ts`)
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: BookStatus; // 'reading' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-read'
  genre: string;
  description?: string;
  rating?: number; // 1-10 scale
  startDate?: Date | Timestamp;
  endDate?: Date | Timestamp;
  dateAdded?: Timestamp;
}
```

## Firebase Integration

### Authentication
- Email/password authentication
- Google OAuth integration
- User state management via `AuthProvider` context

### Firestore Database Structure
```
users/{userId}/
├── books/{bookId}        # User's book collection
├── wishlist/{bookId}     # Books to read later
└── profile               # User preferences (favoriteGenre, etc.)
```

### Key Actions (`src/app/actions.ts`)
- `addBookToList()` - Add book to user's collection
- `addBookToWishlist()` - Add book to wishlist
- `handleGoogleSignIn()` - Process Google authentication
- `getBookRecommendations()` - AI-powered recommendations

## AI Integration (Genkit)

### Setup (`src/ai/genkit.ts`)
- Google AI plugin with Gemini 2.0 Flash model
- Server-side AI processing

### Book Recommendations Flow (`src/ai/flows/generate-book-recommendations.ts`)
- Input: User's reading history as string
- Output: Array of recommended book titles
- Uses structured prompting for consistent results

## Key Components

### Core Components
- **AppLayout** - Main authenticated app shell with sidebar navigation
- **AuthProvider** - Firebase authentication context provider
- **BookCard** - Reusable book display component with cover, title, author, rating
- **AddBookModal** - Modal for adding books with status, rating, dates
- **LandingHeader** - Homepage navigation header
- **UserNav** - User profile dropdown in header

### UI System
- Complete Radix UI component library
- Custom implementations for buttons, cards, dialogs, forms
- Toast notifications system
- Responsive sidebar navigation

## API Integrations

### Google Books API
- Search functionality in `/search` page
- Fetches book metadata: title, author, cover, description
- Environment variable: `NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY`

### Google AI (Genkit)
- Book recommendation engine
- Processes user reading history
- Returns personalized suggestions

## Development Workflow

### Scripts
- `npm run dev` - Development server with Turbopack on port 9002
- `npm run genkit:dev` - Genkit development server
- `npm run genkit:watch` - Genkit with file watching
- `npm run build` - Production build
- `npm run typecheck` - TypeScript checking

### Key Features in Development
- Hot reloading with Turbopack
- TypeScript strict mode
- ESLint configuration
- Responsive design testing

## State Management
- **Authentication**: Context API with `AuthProvider`
- **Local State**: React hooks (useState, useEffect)
- **Server State**: Real-time Firestore subscriptions
- **Forms**: React Hook Form with Zod validation

## Styling & Responsive Design
- Mobile-first responsive approach
- Grid layouts for book collections
- Flexible card-based UI
- Dark/light theme support prepared
- Custom CSS variables for theming

## Security & Performance
- Firebase security rules (implicit)
- Client-side route protection
- Optimized images with Next.js Image component
- Code splitting with Next.js App Router
- TypeScript for type safety

## Environment Configuration
- Firebase project: "yourbooklist"
- Google Books API key required
- Firebase config embedded in codebase
- Vercel/Firebase hosting ready

## User Experience Flow
1. **Landing** → User sees features and value proposition
2. **Signup/Login** → Firebase authentication
3. **Dashboard** → View and manage book collection
4. **Search** → Discover new books via Google Books API
5. **Add Books** → Comprehensive book tracking with status/ratings
6. **Recommendations** → AI-powered suggestions based on history
7. **Profile** → Manage preferences and account

## Development Guidelines
- Use TypeScript strict mode
- Follow React best practices
- Implement proper error handling
- Use Firestore real-time listeners
- Maintain responsive design patterns
- Keep components modular and reusable

## Future Expansion Areas
- Social features (friend connections, sharing)
- Advanced analytics and reading statistics
- Integration with more book APIs
- Enhanced AI recommendations
- Mobile app development
- Reading progress tracking
- Book clubs and community features
