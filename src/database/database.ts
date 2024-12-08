import mongoose from "mongoose";

function connect() {
  mongoose
    .connect("mongodb://localhost:27017/just-reading-books")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

export default {
  connect,
};
