import express from "express";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export const validateCredential = [
  //유효성검사
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("영어와 숫자만 입력 가능합니다."),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("패스워드는 8자 이상이어야합니다.")
    .matches(
      /^(?=.*[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d!@#$%^&*]+$/
    )
    .withMessage(
      "패스워드는 영어 혹은 한글과 숫자, 특수기호를 포함해야 합니다."
    ),
  validate,
];

export const validateSignup =
  // 유효성 검사
  [
    ...validateCredential,
    body("name").notEmpty().withMessage("이름은 두글자 이상!"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("유효한 이메일이 아닙니다"),
    body("url")
      .isURL()
      .withMessage("유효한 url이 아닙니다")
      .optional({ nullable: true, checkFalsy: true }),
    validate,
  ];
// express에서 미들웨어 함수를 호출할 때  배열 내에서 실행되는 함수들에 req/res/next를 자동으로 전달해주기 때문에 인자를 따로 넣어주지 않아도 됩니다.

router.post("/signup", validateSignup, authController.signUp);
router.post("/login", validateCredential, authController.login);
router.get("/me", isAuth, authController.checkAuth);

export default router;
