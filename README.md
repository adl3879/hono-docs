# @adl3879/hono-docs

This is a fork of [`@rcmade/hono-docs`](https://github.com/rcmade/hono-docs) that adds support for **JSDoc comments** to generate OpenAPI documentation.

For standard usage, architecture details, and configuration options, please refer to the [original repository](https://github.com/rcmade/hono-docs).

---

## Install

```bash
npm install --save-dev @adl3879/hono-docs
# or
pnpm add -D @adl3879/hono-docs
```

## Features: JSDoc Support

In addition to defining route metadata in the config file, you can now document your routes directly in your code using JSDoc. This allows you to keep your documentation close to your implementation.

### 1. Configure `routesPath`

In your `hono-docs.ts` config, use `routesPath` to point to your route files. You don't need to define the `api` array manually if you use JSDoc.

```ts
import { defineConfig } from "@adl3879/hono-docs";

export default defineConfig({
  tsConfigPath: "./tsconfig.json",
  openApi: {
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  outputs: {
    openApiJson: "./openapi/openapi.json",
  },
  // Point to your route files here
  routesPath: ["src/routes/userRoutes.ts"],
});
```

### 2. Add JSDoc to your routes

The first JSDoc block in the file must define the `@openapi` (Group Name) and `@apiPrefix`.
Subsequent blocks define the routes using `@route`.

```ts
import { Hono } from "hono";

/**
 * @openapi User Routes
 * @apiPrefix /user
 */
export const userRoutes = new Hono()

  /**
   * @route POST /reset-password
   * @summary Reset Password
   * @description Reset password for the user
   * @tags Auth
   */
  .post("/reset-password", (c) => c.json({ success: true }));

export type AppType = typeof userRoutes;
```

## Features: Smart Caching

To speed up generation, this tool implements a smart caching system.

- **How it works**: It calculates the SHA-256 hash of your input files (`appTypePath`).
- **Cache Hit**: If a file hasn't changed since the last run (and the output already exists), the generator skips it.
- **Cache Storage**: Cache data is stored in `node_modules/.cache/hono-docs/cache.json`.
- **Force Regenerate**: To force a regeneration, simply delete the `node_modules/.cache` directory or run the clean command:
  ```bash
  npx @adl3879/hono-docs clean
  ```

## License

[MIT](https://github.com/adl3879/hono-docs/blob/main/LICENSE)
