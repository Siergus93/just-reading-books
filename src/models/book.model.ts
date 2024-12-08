import mongoose from "mongoose";
import { Book } from "../types/book.type";

const bookModel = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    pages: Number,
    rating: Number,
  })
);

async function addBook(book: Book): Promise<void> {
  await bookModel.create(book);
}

async function getBooks(
  startIndex: number,
  limit: number,
  searchTitle: string | undefined,
  searchAuthor: string | undefined
): Promise<Book[]> {
  let findProps = {};

  if (searchTitle) {
    findProps = {
      ...findProps,
      title: { $regex: new RegExp(searchTitle), $options: "i" },
    };
  }

  if (searchAuthor) {
    findProps = {
      ...findProps,
      author: { $regex: new RegExp(searchAuthor), $options: "i" },
    };
  }

  return await bookModel.find(findProps).skip(startIndex).limit(limit);
}

async function getTotalBooks(
  searchTitle: string | undefined,
  searchAuthor: string | undefined
): Promise<number> {
  let findProps = {};

  if (searchTitle) {
    findProps = {
      ...findProps,
      title: { $regex: new RegExp(searchTitle), $options: "i" },
    };
  }

  if (searchAuthor) {
    findProps = {
      ...findProps,
      author: { $regex: new RegExp(searchAuthor), $options: "i" },
    };
  }

  return await bookModel.find(findProps).countDocuments();
}

export default { bookModel, addBook, getBooks, getTotalBooks };
