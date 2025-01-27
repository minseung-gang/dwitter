import { db } from "../db/dababase.js";

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("SELECT * FROM users WHERE id=?", [id])
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  db.execute(
    "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
    [username, password, name, email, url]
  ).then((result) => result.insertId[0]);
}
