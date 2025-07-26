export type BookStatus = 'reading' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-read';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: BookStatus;
  genre: string;
  rating?: number;
  dateAdded?: any; // Using 'any' for Firestore ServerTimestamp
}
