import { Router } from "express";
import controller from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.get("/get", controller.getBooks);
bookRouter.post("/add", controller.postBook);

export default bookRouter;
