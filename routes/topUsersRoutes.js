const express = require("express");
const { getTopUsers } = require("../controllers/topUsersController");

const router = express.Router();
router.get("/top-users", getTopUsers);

module.exports = router;
