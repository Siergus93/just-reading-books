export type Book = {
  title?: string | null | undefined;
  author?: string | null | undefined;
  isbn?: string | null | undefined;
  pages?: number | null | undefined;
  rating?: number | null | undefined;
};

export function isBook(book: object): book is Book {
  return (
    "title" in book &&
    "author" in book &&
    "isbn" in book &&
    "pages" in book &&
    "rating" in book
  );
}
