export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  publication_date: string;
  description: string;
  cover_image: string;
  pages: number;
  isbn: string;
  language: string;
  publisher: string;
  price: number;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookFilters {
  genre: string;
  minRating: number;
  maxRating: number;
  author: string;
  yearRange: {
    start: number;
    end: number;
  };
  sortBy: "title" | "author" | "rating" | "publicationDate" | "price";
  sortOrder: "asc" | "desc";
}

export interface SearchState {
  query: string;
  filters: BookFilters;
  isLoading: boolean;
  results: Book[];
  totalResults: number;
  currentPage: number;
  booksPerPage: number;
}
