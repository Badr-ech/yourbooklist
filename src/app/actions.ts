'use server';

import {
  generateBookRecommendations,
  type GenerateBookRecommendationsInput,
} from '@/ai/flows/generate-book-recommendations';
import { db } from '@/lib/firebase';
import { Book } from '@/lib/types';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
    await setDoc(bookRef, { ...book, dateAdded: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error adding book to list:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while adding the book.',
    };
  }
}
