'use client';

import { AppLayout } from '@/components/app-layout';
import { BookCard } from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Book, BookStatus } from '@/lib/types';
import { PlusCircle, Search as SearchIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AddBookModal } from '@/components/add-book-modal';
import { useDebounce } from '@/hooks/use-debounce';
import { addBookToList } from '../actions';
import { useAuth } from '@/components/auth-provider';

export default function SearchPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}&maxResults=18&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        const items: Book[] =
          data.items?.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.[0] || 'Unknown Author',
            coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/300x450.png',
            description: item.volumeInfo.description,
            genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
            status: 'plan-to-read', // Default status
          })) || [];
        setSearchResults(items);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch books from Google Books API.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedSearchTerm, toast]);

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleAddBook = async (details: { status: BookStatus; rating?: number; startDate?: Date; endDate?: Date }) => {
    if (!selectedBook || !user) return;
    const bookToAdd = {
      ...selectedBook,
      ...details,
    };
    
    const result = await addBookToList({ userId: user.uid, book: bookToAdd });

    if (result.success) {
      toast({
        title: 'Book Added!',
        description: `"${bookToAdd.title}" has been added to your list.`,
      });
      handleCloseModal();
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search Books</h2>
      </div>
      <p className="text-muted-foreground">Find your next great read by searching the Google Books library.</p>

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
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4">{`Results for "${debouncedSearchTerm}"`}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {searchResults.map((book) => (
                <div key={book.id} className="relative group">
                  <BookCard book={book} />
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleOpenModal(book)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add to list</span>
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && debouncedSearchTerm && searchResults.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            <p>No books found matching your search.</p>
            <p className="text-sm">Try a different title or author.</p>
          </div>
        )}

        {!loading && !debouncedSearchTerm && (
          <div className="text-center text-muted-foreground py-16">
            <p>Start typing to search for books.</p>
          </div>
        )}
      </div>

      {selectedBook && (
        <AddBookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          book={selectedBook}
          onAddBook={handleAddBook}
        />
      )}
    </AppLayout>
  );
}
