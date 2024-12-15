module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Codeforces API",
    version: "1.0.0",
    description:
      "API для работы с данными Codeforces. Включает маршруты для получения топ-10 пользователей, информации о соревнованиях и решенных задачах.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
  paths: {
    "/top-users": {
      get: {
        summary: "Получить топ-10 пользователей",
        description:
          "Возвращает список топ-10 пользователей Codeforces по рейтингу.",
        responses: {
          200: {
            description: "Успешный ответ со списком топ-10 пользователей.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      handle: {
                        type: "string",
                        description: "Ник пользователя",
                      },
                      rating: {
                        type: "integer",
                        description: "Рейтинг пользователя",
                      },
                      rank: {
                        type: "string",
                        description: "Ранг пользователя",
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Ошибка сервера" },
        },
      },
    },
    "/user-contest-count/{handle}": {
      get: {
        summary: "Получить количество соревнований пользователя",
        description:
          "Возвращает количество соревнований, в которых участвовал пользователь.",
        parameters: [
          {
            name: "handle",
            in: "path",
            required: true,
            description: "Ник пользователя Codeforces",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Количество соревнований пользователя.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: { type: "string", description: "Ник пользователя" },
                    contestCount: {
                      type: "integer",
                      description: "Количество соревнований",
                    },
                  },
                },
              },
            },
          },
          404: { description: "Пользователь не найден" },
          500: { description: "Ошибка сервера" },
        },
      },
    },
    "/user-solved-count/{handle}": {
      get: {
        summary: "Получить количество решенных задач пользователя",
        description:
          "Возвращает общее количество уникальных решенных задач пользователем.",
        parameters: [
          {
            name: "handle",
            in: "path",
            required: true,
            description: "Ник пользователя Codeforces",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Количество решенных задач пользователя.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: { type: "string", description: "Ник пользователя" },
                    solvedCount: {
                      type: "integer",
                      description: "Количество решенных задач",
                    },
                  },
                },
              },
            },
          },
          404: { description: "Пользователь не найден" },
          500: { description: "Ошибка сервера" },
        },
      },
    },
    "/user-problem-tags/{handle}": {
      get: {
        summary: "Получить задачи пользователя по тегам",
        description:
          "Возвращает словарь с тегами и количеством задач, решенных пользователем.",
        parameters: [
          {
            name: "handle",
            in: "path",
            required: true,
            description: "Ник пользователя Codeforces",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Словарь решенных задач по тегам.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: { type: "string", description: "Ник пользователя" },
                    tags: {
                      type: "object",
                      additionalProperties: {
                        type: "integer",
                        description: "Количество задач по тегу",
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Пользователь не найден" },
          500: { description: "Ошибка сервера" },
        },
      },
    },
    "/user-problem-difficulty/{handle}": {
      get: {
        summary: "Получить количество задач по сложности",
        description:
          "Возвращает словарь решенных задач, сгруппированных по сложности.",
        parameters: [
          {
            name: "handle",
            in: "path",
            required: true,
            description: "Ник пользователя Codeforces",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Словарь решенных задач по сложности.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: { type: "string", description: "Ник пользователя" },
                    difficulties: {
                      type: "object",
                      additionalProperties: {
                        type: "integer",
                        description: "Количество задач на данной сложности",
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Пользователь не найден" },
          500: { description: "Ошибка сервера" },
        },
      },
    },
    "/user-problem-tag-difficulty/{handle}": {
      get: {
        summary: "Получить задачи по тегу и сложности",
        description:
          "Возвращает словарь задач, сгруппированных по тегам и сложности.",
        parameters: [
          {
            name: "handle",
            in: "path",
            required: true,
            description: "Ник пользователя Codeforces",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Словарь решенных задач по тегам и сложности.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: { type: "string", description: "Ник пользователя" },
                    problems: {
                      type: "object",
                      additionalProperties: {
                        type: "object",
                        additionalProperties: {
                          type: "integer",
                          description: "Количество задач",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Пользователь не найден" },
          500: { description: "Ошибка сервера" },
        },
      },
    },
  },
};
