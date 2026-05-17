/** Shared TypeScript interfaces for book-related data in the author portal. */

export interface AuthorBook {
  bookId: string;
  title: string;
  isbn: string | null;
  genre: string | null;
  publicationDate: string | null;
  status: string;
  mrp: number | null;
  totalCopiesSold: number;
  totalRoyaltyEarned: number;
  royaltyPaid: number;
  royaltyPending: number;
}

export interface BookOption {
  bookId: string;
  title: string;
}
