import { z } from "zod";

export const CreateQuotationSchema = z.object({
  cedula: z.string().min(4),
  placa: z.string(),
  brokerKey: z.string()
});

export const list_dashboard_quotations_schema = z.object({
  brokerKey: z.string().min(1),
  limit: z.number().max(10),
  nextKey: z.string().optional(),
});

export type CreateQuotationDTO = z.infer<typeof CreateQuotationSchema>;

export type ListDashboardQuotationsDTO = z.infer<typeof list_dashboard_quotations_schema>;
