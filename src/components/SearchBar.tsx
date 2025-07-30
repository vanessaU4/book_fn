
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBooks } from '../contexts/BookContext';

export const SearchBar: React.FC = () => {
  const { state, searchBooks } = useBooks();
  const [localQuery, setLocalQuery] = useState(state.query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (localQuery !== state.query) {
        searchBooks(localQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localQuery, state.query, searchBooks]);

  const handleClear = () => {
    setLocalQuery('');
    searchBooks('');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search books by title, author, or description..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10 pr-10 py-3 text-lg border-2 focus:border-primary transition-colors"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {state.isLoading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-md p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Searching...</span>
          </div>
        </div>
      )}
    </div>
  );
};
