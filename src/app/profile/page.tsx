'use client';

import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
  email: string;
  favoriteGenre: string;
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
        setLoading(false);
      }
    }
    if (!authLoading) {
        fetchProfile();
    }
  }, [user, authLoading]);

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
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>
        
        {loading || authLoading ? <ProfileSkeleton /> : profile ? (
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
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Favorite Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {profile.favoriteGenre}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>Could not load profile.</p>
        )}
      </div>
    </AppLayout>
  );
}
