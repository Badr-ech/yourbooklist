import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/types';
import { Star } from 'lucide-react';

interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

export function BookCard({ book, aspectRatio = 'portrait', width = 150, height = 225, className, ...props }: BookCardProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          data-ai-hint="book cover"
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105',
            aspectRatio === 'portrait' ? 'aspect-[2/3]' : 'aspect-square'
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none truncate">{book.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{book.author}</p>
        {book.rating && (
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < book.rating! ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'
                  )}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
