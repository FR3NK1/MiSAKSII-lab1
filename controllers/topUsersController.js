const axios = require("axios");

exports.getTopUsers = async (req, res) => {
  try {
    const response = await axios.get(
      "https://codeforces.com/api/user.ratedList?activeOnly=true"
    );
    const users = response.data.result
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map((user) => ({
        handle: user.handle,
        rating: user.rating,
        rank: user.rank,
      }));

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
