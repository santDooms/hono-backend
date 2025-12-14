import { z } from "zod";

export const PersonResponseSchema = z.object({
  nombre: z.string(),
  edad: z.number().min(18).max(100),
  cedula: z.string().min(4),
  direccion: z.string().optional(),
  estadoCivil: z.string().optional(),
});

export const VehicleResponseSchema = z.object({
  vehiculo: z.string(),
  marca: z.string(),
  modelo: z.string().or(z.number()),
  color: z.string(),
  valor: z.number().positive(),
  anio: z.number().min(1990).max(new Date().getFullYear() + 1),
  tipo: z.enum(["automovil", "camioneta", "motocicleta", "otros"])
});

export type PersonResponseDTO = z.infer<typeof PersonResponseSchema>;
export type VehicleResponseDTO = z.infer<typeof VehicleResponseSchema>;

