import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile } from '@/lib/mock-data';

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="user avatar" />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                <p className="text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.favoriteGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
