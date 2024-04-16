import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  // TODO: Make it secure!
  jwt.verify(
    token,
    "XPQXPSZXkbh$r2VM*hPkn%mkhMqA6J4c",
    async (error, decoded) => {
      if (error) {
        return res.status(401).json("1111");
      }
      const user = await userRepository.findById(decoded.id);
      console.log("user", user, "decode", decoded);
      if (!user) {
        return res.status(401).json("2222");
      }
      req.userId = user.id; // req.customData
      next();
    }
  );
};
