import { Context } from "hono";
import { CreateQuotationDTO, ListDashboardQuotationsDTO } from "../schemas/quotation_schemas";
import * as service from "../services/quotationService";

export const createQuotation = async (c: Context) => {
  try {
    const dto = await c.req.json<CreateQuotationDTO>();
    const created = await service.createQuotation(dto);
    return c.json(created, 201);
  } catch (error : unknown ) {
    console.error("Error in createQuotation controller:", error);
    throw error;
  }
};

export const listQuotations = async (c: Context) => {
  try {
    const dto = await c.req.json<ListDashboardQuotationsDTO>();
    const result = await service.listByBroker(dto);
    return c.json(result);
  } catch (error: unknown) {
    console.error("Error in listQuotations controller:", error);
    throw error;
  }
};