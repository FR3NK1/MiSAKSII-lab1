const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger");

const topUsersRoutes = require("./routes/topUsersRoutes");
const userContestRoutes = require("./routes/userContestRoutes");
const userSolvedRoutes = require("./routes/userSolvedRoutes");
const userProblemTagsRoutes = require("./routes/userProblemTagsRoutes");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", topUsersRoutes);
app.use("/api", userContestRoutes);
app.use("/api", userSolvedRoutes);
app.use("/api", userProblemTagsRoutes);

module.exports = app;
