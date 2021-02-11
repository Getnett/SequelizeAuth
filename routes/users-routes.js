const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.post("/signin", usersController.signIn);

router.post(
  "/signup",
  [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Min 4 characters for username!"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Not valid email address"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Min 4 characters for password!"),
  ],
  usersController.signUp
);

module.exports = router;
