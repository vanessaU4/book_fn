import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  // add other fields as needed
}

export interface BookFilters {
  genre: string;
  minRating: number;
  maxRating: number;
  author: string;
  yearRange: { start: number; end: number };
  sortBy: string;
  sortOrder: string;
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

interface BookContextType {
  state: SearchState;
  dispatch: React.Dispatch<BookAction>;
  searchBooks: (query: string) => void;
  updateFilters: (filters: Partial<BookFilters>) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
}

type BookAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_BOOKS"; payload: Book[] }
  | { type: "UPDATE_FILTERS"; payload: Partial<BookFilters> }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_CURRENT_PAGE"; payload: number };

const initialFilters: BookFilters = {
  genre: "All Genres",
  minRating: 0,
  maxRating: 5,
  author: "",
  yearRange: { start: 1900, end: new Date().getFullYear() },
  sortBy: "title",
  sortOrder: "asc",
};

const initialState: SearchState = {
  query: "",
  filters: initialFilters,
  isLoading: false,
  results: [],
  totalResults: 0,
  currentPage: 1,
  booksPerPage: 8,
};

const BookContext = createContext<BookContextType | undefined>(undefined);

function bookReducer(state: SearchState, action: BookAction): SearchState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, query: action.payload };
    case "SET_BOOKS":
      return {
        ...state,
        results: action.payload,
        totalResults: action.payload.length,
        currentPage: 1,
      };
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: initialFilters,
        currentPage: 1,
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

const API_URL = "https://book-hub-5-vjef.onrender.com/api/books/";

async function fetchBooksFromApi(
  query: string,
  filters: BookFilters
): Promise<Book[]> {
  const params = new URLSearchParams();

  if (query) params.append("search", query);
  if (filters.genre && filters.genre !== "All Genres") {
    params.append("genre", filters.genre);
  }
  // Use != null to allow 0 value for minRating and maxRating
  if (filters.minRating != null) {
    params.append("min_rating", filters.minRating.toString());
  }
  if (filters.maxRating != null) {
    params.append("max_rating", filters.maxRating.toString());
  }
  if (filters.author) params.append("author", filters.author);

  // Check yearRange properly
  if (
    filters.yearRange &&
    filters.yearRange.start != null &&
    filters.yearRange.end != null
  ) {
    params.append("year_start", filters.yearRange.start.toString());
    params.append("year_end", filters.yearRange.end.toString());
  }

  params.append("sort_by", filters.sortBy);
  params.append("sort_order", filters.sortOrder);

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch books from API");
  }

  const data = await response.json();
  return data;
}

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const loadBooks = async (query: string, filters: BookFilters) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const books = await fetchBooksFromApi(query, filters);
      console.log("Fetched books:", books);
      dispatch({ type: "SET_BOOKS", payload: books });
    } catch (error) {
      console.error("Error loading books:", error);
      dispatch({ type: "SET_BOOKS", payload: [] });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    loadBooks(state.query, state.filters);
  }, [state.query, state.filters]);

  const searchBooks = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const updateFilters = (newFilters: Partial<BookFilters>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: newFilters });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  return (
    <BookContext.Provider
      value={{
        state,
        dispatch,
        searchBooks,
        updateFilters,
        clearFilters,
        setCurrentPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a BookProvider");
  return context;
};
