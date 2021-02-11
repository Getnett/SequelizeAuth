const express = require("express");

const { check } = require("express-validator");

const passport = require("passport");

const projectsController = require("../controllers/projects-controller");

const router = express.Router();

router.get("/", projectsController.getAllProjects);

router.get("/documents", projectsController.getAllDocuments);

router.post(
  "/",
  [
    check("title")
      .isLength({ min: 4 })
      .withMessage("Min 4 characters for title!"),
    check("description")
      .isLength({ min: 10 })
      .withMessage("Min 10 characters for description of the project!"),
  ],
  passport.authenticate("jwt", { session: false }),

  projectsController.createProject
);
router.post(
  "/documents",
  [
    check("title")
      .isLength({ min: 4 })
      .withMessage("Min 4 characters for title!"),
    check("about")
      .isLength({ min: 6 })
      .withMessage("Min 6 characters for about document!"),
  ],
  passport.authenticate("jwt", { session: false }),

  projectsController.createDocument
);

module.exports = router;
