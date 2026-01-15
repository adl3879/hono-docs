// import { defineConfig } from "@adl3879/hono-docs";

export default {
  tsConfigPath: "./tsconfig.json",
  openApi: {
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  outputs: {
    openApiJson: "./openapi/openapi.json",
  },
  apis: [
    {
      name: "User Routes",
      apiPrefix: "/user",
      appTypePath: "src/routes/userRoutes.ts",
      api: [
        { api: "/", method: "get", tag: ["UserList"] },
        { api: "/:id", method: "get", tag: ["UserDetail"] },
      ],
    },
  ],
};
