const axios = require("axios");

exports.getUserProblemTags = async (req, res) => {
  const { handle } = req.params;
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );
    const tagCounts = {};
    response.data.result
      .filter((submission) => submission.verdict === "OK")
      .forEach((submission) => {
        submission.problem.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

    const sortedTags = Object.fromEntries(
      Object.entries(tagCounts).sort(([, a], [, b]) => b - a)
    );

    res.json({ handle, tags: sortedTags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProblemDifficulty = async (req, res) => {
  const { handle } = req.params;

  try {
    // Запрос к Codeforces API
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    if (response.data.result && Array.isArray(response.data.result)) {
      const difficultyCounts = {};

      // Фильтруем успешные сабмиссии и подсчитываем задачи по сложности
      response.data.result
        .filter(
          (submission) =>
            submission.verdict === "OK" && submission.problem.rating
        )
        .forEach((submission) => {
          const difficulty = submission.problem.rating; // Сложность задачи
          difficultyCounts[difficulty] =
            (difficultyCounts[difficulty] || 0) + 1;
        });

      res.json({ handle, difficulties: difficultyCounts });
    } else {
      res
        .status(404)
        .json({ error: "Пользователь не найден или не решал задач" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProblemsByTagAndDifficulty = async (req, res) => {
  const { handle } = req.params;

  try {
    // Запрос к Codeforces API для получения всех сабмиссий пользователя
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    if (response.data.result && Array.isArray(response.data.result)) {
      const result = {};

      // Обрабатываем успешные сабмиссии (verdict === "OK") с тегами и сложностью
      response.data.result
        .filter(
          (submission) =>
            submission.verdict === "OK" && submission.problem.rating
        )
        .forEach((submission) => {
          const { tags, rating } = submission.problem;

          tags.forEach((tag) => {
            if (!result[tag]) {
              result[tag] = {};
            }
            result[tag][rating] = (result[tag][rating] || 0) + 1;
          });
        });

      res.json({ handle, problems: result });
    } else {
      res
        .status(404)
        .json({ error: "Пользователь не найден или не решал задач" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
