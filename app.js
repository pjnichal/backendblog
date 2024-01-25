import express from "express";
const app = express();
import postRouter from "./routes/blogpostroute.js";
import authRouter from "./routes/authroute.js";
import cors from "cors";
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());
const port = 4000;

await mongoose
  .connect(
    "mongodb+srv://romrom:itiswhatitis@blogapp.nl23uxd.mongodb.net/blogapp?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Mongo DB Successfully."))
  .catch((err) => console.log("Failed to connect with Mongo DB:", err));

app.use("/blogposts", postRouter);
app.use("/auth", authRouter);
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "Route does not exists", data: {} });
});
export default app;
