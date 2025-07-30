
import React from 'react';
import { SearchBar } from './SearchBar';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore thousands of books across every genre. Find ratings, reviews, and detailed information to help you choose your perfect book.
            </p>
          </div>
          
          <div className="pt-4">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Genres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
