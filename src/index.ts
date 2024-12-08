import express, { Express } from "express";
import bookRouter from "./routers/book.router";
import database from "./database/database";
import cors from "cors";

database.connect();
const app: Express = express();
//possible upgrade - move port value to .env file
const port = process.env.PORT || 3001;

app.use(express.urlencoded());
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRouter);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
