import { Request, Response } from "express";
import model from "../models/book.model";
import { isBook, Book } from "../types/book.type";

async function getBooks(
  req: Request<
    unknown,
    unknown,
    unknown,
    {
      page: string;
      limit: string;
      searchTitle: string | undefined;
      searchAuthor: string | undefined;
    }
  >,
  res: Response
) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchTitle = req.query.searchTitle;
  const searchAuthor = req.query.searchAuthor;

  const startIndex = (page - 1) * limit;

  const total = await model.getTotalBooks(searchTitle, searchAuthor);
  const books = await model.getBooks(
    startIndex,
    limit,
    searchTitle,
    searchAuthor
  );

  res.status(200).send({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    data: books,
  });
}

async function postBook(req: Request, res: Response) {
  const book = req.body;

  if (isBook(book)) {
    const { ok, errors } = isBookValid(book);

    if (!ok) {
      res.status(400).send({ ok: false, details: "validation errors", errors });
      return;
    }

    try {
      await model.addBook(book);
      res.status(200).send({ ok: true });
      return;
    } catch (ex) {
      console.log("ex", ex);
      res.status(500).send({ ok: false, details: "server error" });
      return;
    }
  } else {
    res.status(400).send({ ok: false, details: "not a book" });
    return;
  }
}

const isBookValid = (book: Book) => {
  let errors = {};

  if (!book.title || book.title === "") {
    errors = { ...errors, title: "empty title" };
  }

  if (!book.author || book.author === "") {
    errors = { ...errors, author: "empty author" };
  }

  if (!book.isbn || book.isbn === "") {
    errors = { ...errors, isbn: "empty isbn" };
  }

  if (!book.pages) {
    errors = { ...errors, pages: "pages must be a number" };
  }

  if (!book.rating || book.rating <= 0 || book.rating > 5) {
    errors = { ...errors, rating: "rating must be a number between 1 and 5" };
  }

  return { ok: Object.keys(errors).length === 0, errors };
};

export default {
  getBooks,
  postBook,
};
