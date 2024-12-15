const express = require("express");
const {
  getUserProblemTags,
  getUserProblemDifficulty,
  getUserProblemsByTagAndDifficulty,
} = require("../controllers/userProblemTagsController");

const router = express.Router();
router.get("/user-problem-tags/:handle", getUserProblemTags);

router.get("/user-problem-difficulty/:handle", getUserProblemDifficulty);

router.get(
  "/user-problem-tag-difficulty/:handle",
  getUserProblemsByTagAndDifficulty
);

module.exports = router;
