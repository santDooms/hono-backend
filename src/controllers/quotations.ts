import { Context } from "hono";
import { CreateQuotationDTO } from "../schemas/quotation_schemas";
import * as service from "../services/quotationService";

export const createQuotation = async (c: Context) => {
  try {
    const dto = await c.req.json<CreateQuotationDTO>();
    const created = await service.createQuotation(dto);
    return c.json(created, 201);
  } catch (error) {
    console.error("Error in createQuotation controller:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const listQuotations = async (c: Context) => {
  const brokerKey = c.req.query("brokerKey");
  if (!brokerKey) return c.json({ error: "brokerKey required" }, 400);
  const lastKey = c.req.query("lastKey") ?? undefined;
  const result = await service.listByBroker(brokerKey, lastKey);
  return c.json(result);
};