
import React from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBooks } from '../contexts/BookContext';
import { genres } from '../data/mockBooks';

export const BookFilters: React.FC = () => {
  const { state, updateFilters, clearFilters } = useBooks();
  const { filters } = state;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleGenreChange = (genre: string) => {
    updateFilters({ genre });
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy: sortBy as any });
  };

  const handleSortOrderChange = (sortOrder: string) => {
    updateFilters({ sortOrder: sortOrder as 'asc' | 'desc' });
  };

  const handleRatingChange = (values: number[]) => {
    updateFilters({ 
      minRating: values[0], 
      maxRating: values[1] 
    });
  };

  const handleAuthorChange = (author: string) => {
    updateFilters({ author });
  };

  const handleYearRangeChange = (field: 'start' | 'end', value: number) => {
    updateFilters({
      yearRange: {
        ...filters.yearRange,
        [field]: value
      }
    });
  };

  const hasActiveFilters = 
    filters.genre !== 'All Genres' ||
    filters.minRating > 0 ||
    filters.maxRating < 5 ||
    filters.author.trim() !== '' ||
    filters.yearRange.start > 1900 ||
    filters.yearRange.end < new Date().getFullYear();

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters & Sorting</span>
                {hasActiveFilters && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <Filter className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Genre Filter */}
              <div className="space-y-2">
                <Label>Genre</Label>
                <Select value={filters.genre} onValueChange={handleGenreChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="publicationDate">Publication Date</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Select value={filters.sortOrder} onValueChange={handleSortOrderChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Author Filter */}
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  placeholder="Filter by author name..."
                  value={filters.author}
                  onChange={(e) => handleAuthorChange(e.target.value)}
                />
              </div>

              {/* Rating Range */}
              <div className="space-y-2">
                <Label>Rating Range</Label>
                <div className="px-3">
                  <Slider
                    value={[filters.minRating, filters.maxRating]}
                    onValueChange={handleRatingChange}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{filters.minRating.toFixed(1)}</span>
                    <span>{filters.maxRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-2">
                <Label>Publication Year Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Start"
                    value={filters.yearRange.start}
                    onChange={(e) => handleYearRangeChange('start', parseInt(e.target.value) || 1900)}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                  <Input
                    type="number"
                    placeholder="End"
                    value={filters.yearRange.end}
                    onChange={(e) => handleYearRangeChange('end', parseInt(e.target.value) || new Date().getFullYear())}
                    min={1900}
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-6 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
