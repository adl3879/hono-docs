import { Hono } from "hono";

export const userRoutes = new Hono()
  .get("/", (c) => c.json({ name: "current user" }))
  .get("/u/:id", (c) => c.json({ id: c.req.param("id") }))
  .delete("/u/:id", (c) => c.json({ id: c.req.param("id") }));

export type AppType = typeof userRoutes;
//comment
