import { Hono } from "hono";
import { createQuotation, listQuotations } from "../controllers/quotations";
import { zValidator } from "@hono/zod-validator";
import { CreateQuotationSchema, list_dashboard_quotations_schema } from "../schemas/quotation_schemas";
//import { login } from "./controllers/auth";

export const registerRoutes = (app: Hono) => {
//  app.post("/auth/login", login);
  app.post("/new_quotation", zValidator("json", CreateQuotationSchema), createQuotation);
  app.post("/list_quotations",zValidator("json", list_dashboard_quotations_schema), listQuotations);
};