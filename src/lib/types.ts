export type BookStatus = 'reading' | 'read' | 'wishlist';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: BookStatus;
  genre: string;
}
