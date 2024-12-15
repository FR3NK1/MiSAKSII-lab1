const axios = require("axios");

exports.getUserSolvedCount = async (req, res) => {
  const { handle } = req.params;
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const solvedProblems = new Set(
      response.data.result
        .filter((submission) => submission.verdict === "OK")
        .map(
          (submission) =>
            `${submission.problem.contestId}-${submission.problem.index}`
        )
    );
    const solvedCount = solvedProblems.size;
    res.json({ handle, solvedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
