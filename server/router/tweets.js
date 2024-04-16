import express from "express";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuth, tweetController.getTweets);

router.get("/:id", isAuth, tweetController.getTweet);

router.post("/", isAuth, tweetController.createTweet);

router.put("/:id", isAuth, tweetController.updateTweet);

router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;

/* 
  router는 말 그대로 주어진 경로에 대해 어떤 함수를 연결할 것인지 용도로만 사용해야 합니다.
  라우터 자체가 다른 구현 사항이나 서비스의 비즈니스 로직을 가지고 있으면 라우터라는 순수 역할에서 벗어나서
  그 이상의 것을 하게되는 것이기 때문.
*/
