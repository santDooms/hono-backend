import { Hono } from "hono";
import { registerRoutes } from "./routes";
import "./env";

export const app = new Hono();
app.get("/health", (c) => c.json({ status: "ok", service: "tanstack-backend" }));
registerRoutes(app);