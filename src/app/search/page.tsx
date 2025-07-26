'use client';

import { AppLayout } from '@/components/app-layout';
import { BookCard } from '@/components/book-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockBooks } from '@/lib/mock-data';
import type { Book, BookStatus } from '@/lib/types';
import { PlusCircle, Search as SearchIcon } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return mockBooks.slice(0, 6); // Show some initial books
    }
    return mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleAddToList = (book: Book, status: BookStatus) => {
    // In a real app, this would be a server action to update the database.
    toast({
      title: 'Book Added!',
      description: `"${book.title}" has been added to your ${
        status === 'reading' ? 'Currently Reading' : status === 'read' ? 'Read' : 'Wishlist'
      }.`,
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search Books</h2>
      </div>
      <p className="text-muted-foreground">
        Find your next great read in our collection.
      </p>

      <div className="relative my-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title or author..."
          className="pl-10 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {searchTerm ? `Results for "${searchTerm}"` : 'Discover New Books'}
        </h3>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {searchResults.map((book) => (
              <div key={book.id} className="relative group">
                <BookCard book={book} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Add to list</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAddToList(book, 'reading')}>
                      Add to Currently Reading
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAddToList(book, 'read')}>
                      Add to Read
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAddToList(book, 'wishlist')}>
                      Add to Wishlist
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p>No books found matching your search.</p>
            <p className="text-sm">Try a different title or author.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
