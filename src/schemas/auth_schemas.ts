import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string()
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: z.enum(["user", "admin", "broker"]),
  brokerKey: z.string()
});

export type UserResponseDTO = z.infer<typeof UserResponseSchema>;