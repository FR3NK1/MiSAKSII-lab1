const axios = require("axios");

exports.getUserContestCount = async (req, res) => {
  const { handle } = req.params;
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const contestCount = response.data.result.length;
    res.json({ handle, contestCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
