import { Hono } from "hono";
import { registerRoutes } from "./routes";
import "./env/dev";
import { errorHandler } from "./middlewares/error_handler";

export const app = new Hono();

app.onError((err, c) => {
  return errorHandler(err, c);
});

app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    return errorHandler(err as Error, c);
  }
});

app.get("/health", (c) => c.json({ status: "ok", service: "tanstack-backend" }));
registerRoutes(app);