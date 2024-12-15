const express = require("express");
const { getUserSolvedCount } = require("../controllers/userSolvedController");

const router = express.Router();
router.get("/user-solved-count/:handle", getUserSolvedCount);

module.exports = router;
