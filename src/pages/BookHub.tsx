import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { BookFilters } from "../components/BookFilters";
import { BookGrid } from "../components/BookGrid";
import { BookDetails } from "../components/BookDetails";
import { BookProvider } from "../contexts/BookContext";

const BookHubContent: React.FC = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (!selectedBookId) {
        setSelectedBook(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://book-hub-5-vjef.onrender.com/api/books/${selectedBookId}/`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setSelectedBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setSelectedBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [selectedBookId]);

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleBackToGrid = () => {
    setSelectedBookId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {selectedBook ? (
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <p className="text-muted-foreground">Loading book details...</p>
          ) : (
            <BookDetails book={selectedBook} onBack={handleBackToGrid} />
          )}
        </main>
      ) : (
        <>
          <Hero />
          <main className="container mx-auto px-4 py-4">
            <div className="space-y-6">
              <BookFilters />
              <BookGrid onBookSelect={handleBookSelect} />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export const BookHub: React.FC = () => {
  return (
    <BookProvider>
      <BookHubContent />
    </BookProvider>
  );
};
