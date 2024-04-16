import express from "express";
import morgan from "morgan";
import hemlet from "helmet";
import cors from "cors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";

const app = express();

//미들웨어 셋팅
app.use(express.json());
app.use(morgan("tiny"));
app.use(hemlet());
app.use(cors());

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500);
});

app.listen(8080);
