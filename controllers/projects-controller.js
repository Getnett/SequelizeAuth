const { validationResult } = require("express-validator");

const HttpError = require("../util/http-error");

const { User, Projects, Documents } = require("../models");

const getAllProjects = async (req, res, next) => {
  try {
    const users = await Projects.findAll({ include: "documents" });
    return res.json(users);
  } catch (error) {
    const err = new HttpError("Can't get projects some thing went wrong", 500);
    return next(err);
  }
};
const createProject = async (req, res, next) => {
  const { userUid, description, title } = req.body;

  const error = validationResult(req);
  const arrayWithMessage = error.array();
  let errorMessage = "";
  if (arrayWithMessage.length !== 0) {
    errorMessage = arrayWithMessage[0]["msg"];
  }

  console.log(arrayWithMessage);
  if (!error.isEmpty()) {
    return next(new HttpError(errorMessage, 422));
  }

  try {
    const user = await User.findOne({ where: { uid: userUid } });
    const project = await Projects.create({
      title,
      description,
      userId: user.id,
    });
    return res.json(project);
  } catch (error) {
    const err = new HttpError(
      "Can't create project some thing went wrong",
      500
    );
    return next(err);
  }
};

const createDocument = async (req, res, next) => {
  const { userUid, projectPid, about, title } = req.body;

  const error = validationResult(req);
  const arrayWithMessage = error.array();
  let errorMessage = "";
  if (arrayWithMessage.length !== 0) {
    errorMessage = arrayWithMessage[0]["msg"];
  }

  console.log(arrayWithMessage);
  if (!error.isEmpty()) {
    return next(new HttpError(errorMessage, 422));
  }

  try {
    const user = await User.findOne({ where: { uid: userUid } });
    const project = await Projects.findOne({ where: { pid: projectPid } });
    const document = await Documents.create({
      title,
      about,
      userId: user.id,
      projId: project.id,
    });
    return res.json(document);
  } catch (error) {
    const err = new HttpError("Can't document some thing went wrong", 500);
    return next(err);
  }
};
const getAllDocuments = async (req, res, next) => {
  try {
    const users = await Documents.findAll();
    return res.json(users);
  } catch (error) {
    const err = new HttpError("Can't get documents some thing went wrong", 500);
    return next(err);
  }
};

exports.createProject = createProject;
exports.getAllProjects = getAllProjects;
exports.createDocument = createDocument;
exports.getAllDocuments = getAllDocuments;
