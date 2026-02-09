import { z } from "zod";

export const CreateQuotationSchema = z.object({
  tipoIdentificacion: z.enum(["cc", "ce", "passport"]),
  cedula: z.string().min(4),
  placa: z.string(),
  tipoPlaca: z.enum(["particular", "publico"]),
  brokerKey: z.string()
});

export const list_dashboard_quotations_schema = z.object({
  brokerKey: z.string().min(1),
  limit: z.number().max(50),
  nextKey: z.string().optional(),
});

export type CreateQuotationDTO = z.infer<typeof CreateQuotationSchema>;

export type ListDashboardQuotationsDTO = z.infer<typeof list_dashboard_quotations_schema>;
