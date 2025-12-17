import { Hono } from "hono";
import { cors } from "hono/cors";
import { registerRoutes } from "./routes";
import "./env/dev";
import { errorHandler } from "./middlewares/error_handler";

export const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

registerRoutes(app);

app.onError((err, c) => {
  return errorHandler(err, c);
});
