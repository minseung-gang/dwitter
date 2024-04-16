import * as tweetRepository from "../data/tweet.js";

/*
  다른 라우터에서 동일한 처리를 해야 하거나 또는 여러가지를 복합적으로 처리 해야 한다면,
  컨트롤러에 정의된 함수를 재사용할 수 있다.

  이 데이터를 가지고 어떤 일들을 별도로 해줘야하는 지, 누가 읽을 수 있는 권한이 있는 지,
  어떤 로직으로 데이터를 읽고/쓰고/변경할 것인 지 등등의 비지니스 로직을 담당한다.
*/

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const tweet = await (username
    ? tweetRepository.Username(username)
    : tweetRepository.getAll());
  res.status(200).json(tweet);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id(${id}) not found!` });
  }
}

export async function createTweet(req, res, next) {
  const { name, text, username } = req.body;
  const tweet = await tweetRepository.create(name, text, username);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id(${id}) not found!` });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
