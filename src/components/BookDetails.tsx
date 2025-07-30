import React from "react";
import { Book } from "../types/book";
import {
  ArrowLeft,
  Star,
  Calendar,
  BookOpen,
  Globe,
  Building,
  DollarSign,
  Barcode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { imageService } from "../services/imageService";

interface BookDetailsProps {
  book: Book;
  onBack: () => void;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-5 w-5 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Books
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book Cover and Basic Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={imageService.getImageUrl(book.cover_image)}
                alt={book.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />
              <div className="absolute top-4 right-4">
                <Badge
                  variant={book.in_stock ? "default" : "destructive"}
                  className="text-sm"
                >
                  {book.in_stock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="text-sm">
                  {book.genre}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Purchase Section */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold flex items-center justify-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  {book.price.toFixed(2)}
                </div>
                <Button size="lg" className="w-full" disabled={!book.in_stock}>
                  {book.in_stock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Add to Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          {/* Title and Author */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">
              by {book.author}
            </p>

            <div className="flex items-center gap-2 mb-4">
              {renderStars(book.rating)}
              <span className="text-lg font-medium ml-2">{book.rating}</span>
              <span className="text-muted-foreground">/ 5.0</span>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </CardContent>
          </Card>

          {/* Book Information */}
          <Card>
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Publication Date:</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(book.publication_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Pages:</span>
                  <span className="text-sm text-muted-foreground">
                    {book.pages}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Language:</span>
                  <span className="text-sm text-muted-foreground">
                    {book.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Publisher:</span>
                  <span className="text-sm text-muted-foreground">
                    {book.publisher}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                  <Barcode className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">ISBN:</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {book.isbn}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Preview
                </Button>
                <Button variant="outline" className="w-full">
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
