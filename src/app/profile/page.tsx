'use client';

import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from '@/components/theme-provider';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Book } from '@/lib/types';
import { BookOpenCheck, Star, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

type UserProfile = {
  email: string;
  favoriteGenre: string;
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchProfileAndBooks = async () => {
        setLoading(true);
        try {
          // Fetch profile
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            setProfile(data);
            setSelectedGenre(data.favoriteGenre || '');
          } else {
             console.log("No such document!");
             setProfile(null);
          }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setProfile(null);
        }

        // Setup book listener
        const q = query(collection(db, 'users', user.uid, 'books'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const userBooks: Book[] = [];
          querySnapshot.forEach((doc) => {
            userBooks.push({ id: doc.id, ...doc.data() } as Book);
          });
          setBooks(userBooks);
          setLoading(false); // Combined loading state
        }, (error) => {
          console.error("Error fetching books:", error);
          setLoading(false);
        });

        return () => unsubscribe();
      };
      
      fetchProfileAndBooks();

    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);


  const stats = useMemo(() => {
    const totalBooks = books.length;
    const booksCompleted = books.filter(b => b.status === 'completed').length;
    const ratedBooks = books.filter(b => typeof b.rating === 'number' && b.rating > 0);
    const averageRating = ratedBooks.length > 0 
      ? ratedBooks.reduce((acc, b) => acc + b.rating!, 0) / ratedBooks.length
      : 0;

    return {
      totalBooks,
      booksCompleted,
      averageRating: averageRating.toFixed(1)
    };
  }, [books]);


  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleSaveChanges = async () => {
    if (!user || !selectedGenre) return;

    setIsSaving(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        favoriteGenre: selectedGenre,
      });
      setTheme(selectedGenre.toLowerCase() as any);
      setProfile((prev) => (prev ? { ...prev, favoriteGenre: selectedGenre } : null));
      toast({
        title: 'Success!',
        description: 'Your profile has been updated.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const userInitial = profile?.email ? profile.email.charAt(0).toUpperCase() : '?';

  const ProfileSkeleton = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const genreOptions = ['Fantasy', 'Romance', 'Sci-Fi', 'Horror', 'Thriller', 'Historical'];

  if (authLoading || loading) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                </div>
                <ProfileSkeleton />
            </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>

        {profile ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" alt={profile.email} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{profile.email}</CardTitle>
                      <CardDescription>Reader Extraordinaire</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="favorite-genre">Favorite Genre (Theme)</Label>
                    <Select onValueChange={handleGenreChange} value={selectedGenre}>
                      <SelectTrigger id="favorite-genre">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genreOptions.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      This will also change the application theme.
                    </p>
                  </div>
                  
                  <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Reading Stats</CardTitle>
                  <CardDescription>Your reading journey in numbers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                        <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBooks}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Books Completed</CardTitle>
                         <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.booksCompleted}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.averageRating}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <p>Could not load profile. If you've just signed up, please try refreshing the page.</p>
        )}
      </div>
    </AppLayout>
  );
}
