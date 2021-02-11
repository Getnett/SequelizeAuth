const express = require("express");
const bodyParser = require("body-parser");

const { sequelize } = require("./models");

const projectsRouter = require("./routes/projects-routes");

const usersRouter = require("./routes/users-routes");

const HttpError = require("./util/http-error");

require("./middleware/auth-passport");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRouter);

app.use("/api/projects", projectsRouter);

app.use((req, res, next) => {
  throw new HttpError("Route not found!", 404);
});

// DB_CONNECTION
sequelize
  .authenticate()
  .then(() => {
    app.listen(5000, (res) => {
      console.log("Successfully established connection to database");
      console.log(
        "Server up on http://localhost:5000 Listing for requests...."
      );
    });
  })
  .catch((err) => {
    logger.error("Unable to connect to database", err);
  });
