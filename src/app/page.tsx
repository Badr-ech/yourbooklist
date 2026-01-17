'use client';

import { LandingHeader } from '@/components/landing-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpenCheck, BotMessageSquare, Search as SearchIcon, Star, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { mockBooks } from '@/lib/mock-data';
import type { Book } from '@/lib/types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Get unique genres from mock books
  const genres = useMemo(() => {
    const uniqueGenres = new Set(mockBooks.map(book => book.genre).filter(Boolean));
    return ['all', ...Array.from(uniqueGenres)];
  }, []);

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return mockBooks.filter(book => {
      const matchesSearch = searchTerm === '' || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Organize Your Reading Life
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Track your reading, discover new books with AI, and connect with a community of readers.
                </p>
              </div>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Books Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-headline">
                  Browse Popular Books
                </h2>
                <p className="text-muted-foreground">
                  Explore our collection and see what YourBookList has to offer
                </p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      variant={selectedGenre === genre ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedGenre(genre)}
                      className="whitespace-nowrap"
                    >
                      {genre === 'all' ? 'All Genres' : genre}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[2/3] w-full">
                        <Image
                          src={book.coverImage || 'https://placehold.co/300x450.png'}
                          alt={book.title}
                          fill
                          className="object-cover"
                          data-ai-hint={`book cover for ${book.title}`}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-1" title={book.title}>
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-2">
                        {book.genre && (
                          <Badge variant="secondary" className="text-xs">
                            {book.genre}
                          </Badge>
                        )}
                        {book.rating && (
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{book.rating}/10</span>
                          </div>
                        )}
                      </div>
                      {book.status && (
                        <Badge 
                          variant={book.status === 'completed' ? 'default' : book.status === 'reading' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {book.status === 'plan-to-read' ? 'Want to Read' : 
                           book.status === 'reading' ? 'Currently Reading' : 
                           'Completed'}
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild size="sm" className="w-full" variant="outline">
                        <Link href="/signup">Sign up to track</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No books found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-16 lg:py-20 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Everything You Need to Be a Super-Reader
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From tracking your progress to finding your next favorite book,
                  we&apos;ve got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-4 rounded-lg">
                <BookOpenCheck className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Track Your Books</h3>
                <p className="text-sm text-muted-foreground">
                  Easily manage your reading lists: currently reading, read, and
                  wishlist. Never lose track of a book again.
                </p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg">
                <BotMessageSquare className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized book suggestions from our AI based on your unique
                  reading history and preferences.
                </p>
              </div>
              <div className="grid gap-1 text-center p-4 rounded-lg">
                <SearchIcon className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Discover & Search</h3>
                <p className="text-sm text-muted-foreground">
                  Search our extensive database to find books and authors.
                  Discover new reads and add them to your lists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Reading Journey?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of book lovers organizing their reading life with YourBookList.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/signup">Create Your Free Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} YourBookList. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
