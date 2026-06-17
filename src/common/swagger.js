import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec =
  swaggerJsdoc({
    definition: {
      openapi: "3.0.0",

      info: {
        title:
          "EIS App Setting API",
        version: "1.0.0",
      },

      servers: [
        {
          url:
            "http://localhost:4200/api/app-setting",
        },
      ],
    },

    apis: [
      "./src/modules/**/*.js",
    ],
  });