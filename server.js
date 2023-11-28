import express from "express";
const app = express();
import postRouter from "./routes/blogpostroute.js";
import bodyParser from "body-parser";
app.use(bodyParser.json());
const port = 3000;
app.use("/blogpost", postRouter);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
