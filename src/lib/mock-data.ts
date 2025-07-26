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
    description: 'The story of Paul Atreides, a young nobleman whose family accepts the stewardship of the desert planet Arrakis.',
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'reading',
    genre: 'Fantasy',
    description: 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and treasure within it, from the dragon Smaug.',
  },
  // Read
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'completed',
    genre: 'Sci-Fi',
    rating: 9,
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
  },
  {
    id: '4',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'completed',
    genre: 'Classic',
    rating: 8,
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'completed',
    genre: 'Dystopian',
    rating: 9,
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'completed',
    genre: 'Romance',
    rating: 7,
  },
  // Plan to Read
  {
    id: '7',
    title: 'The Three-Body Problem',
    author: 'Cixin Liu',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'plan-to-read',
    genre: 'Sci-Fi',
  },
  {
    id: '8',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'plan-to-read',
    genre: 'Fantasy',
  },
  {
    id: '9',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'plan-to-read',
    genre: 'Non-Fiction',
  },
  {
    id: '10',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://placehold.co/300x450.png',
    status: 'plan-to-read',
    genre: 'Contemporary Fiction',
  },
];

export const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: 'https://placehold.co/100x100.png',
  favoriteGenres: ['Sci-Fi', 'Fantasy', 'Classic', 'Dystopian', 'Non-Fiction'],
};
