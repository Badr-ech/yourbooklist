import type { Book } from './types';

export const mockBooks: Book[] = [
  // Currently Reading
  {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'reading',
    genre: 'Sci-Fi',
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'reading',
    genre: 'Fantasy',
  },
  // Read
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'read',
    genre: 'Sci-Fi',
  },
  {
    id: '4',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'read',
    genre: 'Classic',
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'read',
    genre: 'Dystopian',
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'read',
    genre: 'Romance',
  },
  // Wishlist
  {
    id: '7',
    title: 'The Three-Body Problem',
    author: 'Cixin Liu',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'wishlist',
    genre: 'Sci-Fi',
  },
  {
    id: '8',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'wishlist',
    genre: 'Fantasy',
  },
  {
    id: '9',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'wishlist',
    genre: 'Non-Fiction',
  },
  {
    id: '10',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'wishlist',
    genre: 'Contemporary Fiction',
  },
];

export const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: 'https://placehold.co/100x100.png',
  favoriteGenres: ['Sci-Fi', 'Fantasy', 'Classic', 'Dystopian', 'Non-Fiction'],
};
