'use client';

import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

type UserProfile = {
  email: string;
  favoriteGenre: string;
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setSelectedGenre(data.favoriteGenre);
        }
        setLoading(false);
      }
    }
    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

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
      setTheme(selectedGenre.toLowerCase());
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
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  );

  const genreOptions = ['Fantasy', 'Romance', 'Sci-Fi', 'Horror', 'Thriller', 'Historical'];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>

        {loading || authLoading ? (
          <ProfileSkeleton />
        ) : profile ? (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt={profile.email} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">My Profile</CardTitle>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  Changing your favorite genre will also change the application theme.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Current Favorite Genre</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {profile.favoriteGenre}
                  </Badge>
                </div>
              </div>
              
              <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <p>Could not load profile.</p>
        )}
      </div>
    </AppLayout>
  );
}
