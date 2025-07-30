import { Book } from "../types/book";

const API_URL = "https://book-hub-5-vjef.onrender.com/api";

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${API_URL}/books/`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
  },

  async getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_URL}/books/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    return response.json();
  },
};
