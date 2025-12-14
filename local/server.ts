import { serve } from "@hono/node-server";
import { app } from "../src/app";


serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  () => {
    console.log("🚀 API running on http://localhost:4000");
  }
);
