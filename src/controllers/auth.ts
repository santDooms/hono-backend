import { Context } from "hono";
import { LoginDTO } from "../schemas/auth_schemas";
import { authenticateUser } from "../services/authService";

export const login = async (c: Context) => {
  try {
    const dto: LoginDTO = await c.req.json();

    const authResult = await authenticateUser(dto);

    return c.json(authResult, 200);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        error: error.message || "Error en autenticación",
      },
      error.statusCode || 500
    );
  }
};
