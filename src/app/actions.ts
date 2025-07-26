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
  try {
    const bookRef = doc(db, 'users', userId, 'books', book.id);
    
    // Create a new object for Firestore to avoid mutating the original
    // and to ensure type safety.
    const bookData: any = {
      ...book,
      dateAdded: serverTimestamp(),
    };

    // Convert dates to Firestore Timestamps only if they exist.
    if (book.startDate) {
        bookData.startDate = Timestamp.fromDate(new Date(book.startDate as Date));
    } else {
        delete bookData.startDate;
    }
    
    if (book.endDate) {
        bookData.endDate = Timestamp.fromDate(new Date(book.endDate as Date));
    } else {
        delete bookData.endDate;
    }

    await setDoc(bookRef, bookData, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error adding book to list:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while adding the book.',
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
