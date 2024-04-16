import * as userRepository from "../data/auth.js";

let tweets = [
  {
    id: "1",
    text: "Dream coders!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "Dream coders!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

// 데이터베이스나 클라우드에서 데이터를 읽어오는 순수한 읽기/쓰기 전용 로직이 사용됨

export async function Username(username) {
  const tweets = await getAll();
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getById(id) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) null;
  const { username, name, url } = await userRepository.findById(tweet.userId);
  return { ...tweet, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets.filter((tweet) => tweet.id !== id);
}
