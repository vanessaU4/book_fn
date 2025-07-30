
import React from 'react';
import { BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
  
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Book Hub</h1>
              <p className="text-xs text-muted-foreground">Discover Amazing Books</p>
            </div>
          </div>

    
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              New Releases
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Best Sellers
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </Button>
  
            <Button size="sm">
              Sign In
            </Button>

            

          </div>
        </div>
      </div>
    </header>
  );
};
