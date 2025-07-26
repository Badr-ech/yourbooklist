import { Timestamp } from "firebase/firestore";

export type BookStatus = 'reading' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-read';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: BookStatus;
  genre: string;
  description?: string;
  rating?: number; // 1-10 scale
  startDate?: Timestamp;
  endDate?: Timestamp;
  dateAdded?: Timestamp;
}
