'use client';

import { AppLayout } from '@/components/app-layout';
import { BookCard } from '@/components/book-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBooks } from '@/lib/mock-data';
import type { Book } from '@/lib/types';

export default function DashboardPage() {
  const reading = mockBooks.filter((book) => book.status === 'reading');
  const read = mockBooks.filter((book) => book.status === 'read');
  const wishlist = mockBooks.filter((book) => book.status === 'wishlist');

  const BookList = ({ books }: { books: Book[] }) => {
    if (books.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-16">
          No books in this list yet.
        </div>
      );
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <Tabs defaultValue="reading" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reading">Currently Reading</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="reading" className="space-y-4">
          <BookList books={reading} />
        </TabsContent>
        <TabsContent value="read" className="space-y-4">
          <BookList books={read} />
        </TabsContent>
        <TabsContent value="wishlist" className="space-y-4">
          <BookList books={wishlist} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
