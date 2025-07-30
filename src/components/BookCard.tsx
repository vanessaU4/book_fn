import React from "react";
import { Book } from "../types/book";
import { Star, Calendar, DollarSign, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
  onViewDetails: (bookId: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={book.cover_image}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={book.in_stock ? "default" : "destructive"}>
            {book.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary">{book.genre}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-muted-foreground mb-2">by {book.author}</p>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(book.rating)}
          <span className="text-sm text-muted-foreground ml-1">
            ({book.rating})
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(book.publication_date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{book.pages} pages</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-semibold text-lg">
            <DollarSign className="h-4 w-4" />
            <span>{book.price.toFixed(2)}</span>
          </div>
          <Button
            size="sm"
            onClick={() => onViewDetails(book.id)}
            className="hover:scale-105 transition-transform"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
