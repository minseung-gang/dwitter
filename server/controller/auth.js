import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const jwtSecretKey = "XPQXPSZXkbh$r2VM*hPkn%mkhMqA6J4c";
const jwtExpiresInDays = "7d";
const bcryptSaltRounds = 12;

export async function signUp(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ message: "유효하지 않은 아이디 혹은 비밀번호입니다." });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "유효하지 않은 아이디 혹은 비밀번호입니다." });
  }
  const token = createJwtToken(user.id);
  return res.status(200).json({
    token,
    message: "로그인 성공!",
  });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function checkAuth(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
