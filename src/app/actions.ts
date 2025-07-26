'use server';

import {
  generateBookRecommendations,
  type GenerateBookRecommendationsInput,
} from '@/ai/flows/generate-book-recommendations';
import { db } from '@/lib/firebase';
import { Book } from '@/lib/types';
import { doc, setDoc, serverTimestamp, collection, getDoc, Timestamp } from 'firebase/firestore';

export async function getBookRecommendations(input: GenerateBookRecommendationsInput) {
  try {
    const result = await generateBookRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting book recommendations:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function addBookToList({ userId, book }: { userId: string, book: Book }) {
  if (!userId) {
    return { success: false, error: 'User not authenticated.' };
  }
  
  // --- DEBUGGING START ---
  console.log('[actions.ts] Attempting to add book. User ID:', userId);
  console.log('[actions.ts] Received book object:', JSON.stringify(book, null, 2));
  // --- DEBUGGING END ---

  try {
    const bookRef = doc(db, 'users', userId, 'books', book.id);
    
    const bookData: any = {
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage,
      status: book.status,
      genre: book.genre,
      description: book.description || null,
      rating: book.rating || null,
      dateAdded: serverTimestamp(),
    };

    if (book.startDate) {
        bookData.startDate = Timestamp.fromDate(new Date(book.startDate));
    }
    
    if (book.endDate) {
        bookData.endDate = Timestamp.fromDate(new Date(book.endDate));
    }

    // --- DEBUGGING START ---
    console.log('[actions.ts] Data being sent to Firestore:', JSON.stringify(bookData, null, 2));
    // --- DEBUGGING END ---

    await setDoc(bookRef, bookData, { merge: true });
    
    console.log('[actions.ts] Book added successfully!');
    return { success: true };

  } catch (error: any) {
    // --- DEBUGGING START ---
    console.error('[actions.ts] Firestore error adding book:', error);
    console.error('[actions.ts] Error Code:', error.code);
    console.error('[actions.ts] Error Message:', error.message);
    // --- DEBUGGING END ---
    
    return {
      success: false,
      error: 'An unexpected error occurred while adding the book. Check server console for details.',
    };
  }
}

export async function addBookToWishlist({ userId, book }: { userId: string, book: Omit<Book, 'status'> }) {
  if (!userId) {
    return { success: false, error: 'User not authenticated.' };
  }
  try {
    const wishlistRef = doc(collection(db, 'users', userId, 'wishlist'), book.id);
    await setDoc(wishlistRef, { 
        ...book, 
        status: 'plan-to-read',
        dateAdded: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding book to wishlist:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while adding to wishlist.',
    };
  }
}

export async function handleGoogleSignIn({ uid, email }: { uid: string; email: string | null }) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: uid,
        email: email,
        favoriteGenre: 'Fantasy', // Default genre for new Google users
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error handling Google sign-in:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during sign-in.',
    };
  }
}
