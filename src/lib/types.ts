import { Timestamp } from "firebase/firestore";

export type BookStatus = 'reading' | 'completed' | 'on-hold' | 'dropped' | 'plan-to-read';

// Use a flexible type for dates coming from the client, which might be Date or undefined
export interface BookClient {
    status: BookStatus;
    rating?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: BookStatus;
  genre: string;
  description?: string;
  rating?: number; // 1-10 scale
  startDate?: Date | Timestamp; // Allow both for flexibility
  endDate?: Date | Timestamp;
  dateAdded?: Timestamp;
}
