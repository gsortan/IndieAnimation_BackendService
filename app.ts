import express, { type Request, type Response } from "express";
import animationRouter from "./routes/animationRouter"
import tagRouter from "./routes/tagRouter";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/animations", animationRouter);
app.use("/api/tags", tagRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = 3000;

app.listen(PORT, (err?: unknown) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Listening on port ${PORT}!`);
});
