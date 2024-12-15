const express = require("express");
const { getUserContestCount } = require("../controllers/userContestController");

const router = express.Router();
router.get("/user-contest-count/:handle", getUserContestCount);

module.exports = router;
