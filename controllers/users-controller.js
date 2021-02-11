const HttpError = require("../util/http-error");

const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ include: ["projects", "documents"] });
    return res.json(users);
  } catch (error) {
    const err = new HttpError("Can't get users some thing went wrong", 500);
    return next(err);
  }
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ where: { email: email } });
  } catch (error) {
    const err = new HttpError("Login failed some thing went wrong", 500);
    return next(err);
  }

  if (!user) {
    const err = new HttpError("Invalid credtionals try again!!", 403);
    return next(err);
  }
  let isValidPassword;
  try {
    isValidPassword = await bycrypt.compare(password, user.password);
  } catch (error) {
    const err = new HttpError(
      "Please check your credtionals and try again",
      500
    );
    return next(err);
  }
  if (!isValidPassword) {
    const err = new HttpError("Invalid credtionals try again!!", 403);
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.uid, email: user.email },
      "private_key_to_lock_it",
      { expiresIn: "1hr" }
    );
  } catch (error) {
    const err = new HttpError("Sigining In failed  please try again", 500);
    return next(err);
  }

  res.status(200).json({
    token,
    userId: user.uid,
    email: user.email,
  });
};
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const error = validationResult(req);
  const arrayWithMessage = error.array();
  let errorMessage = "";
  if (arrayWithMessage.length !== 0) {
    errorMessage = arrayWithMessage[0]["msg"];
  }

  console.log(errorMessage);
  if (!error.isEmpty()) {
    return next(new HttpError(errorMessage, 422));
  }

  let user;
  try {
    user = await User.findOne({ where: { email } });
  } catch (error) {
    const err = new HttpError("Something went wrong during signup");
    return next(err);
  }

  if (user) {
    return next(new HttpError("User already exists!please try to login", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Creating user failed try again", 500);
    return next(err);
  }

  try {
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json(userCreated);
  } catch (error) {
    const err = new HttpError("Something went wrong please try again!", 500);
    return next(err);
  }
};

exports.getAllUsers = getAllUsers;
exports.signIn = signIn;
exports.signUp = signUp;
