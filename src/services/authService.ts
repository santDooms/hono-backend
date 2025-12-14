import { LoginDTO, UserResponseDTO } from "../schemas/auth_schemas";
import { AppError } from "../middlewares/error_handler";
import { USERS } from "../utils/users";
import { generateToken, validatePassword } from "../utils/jwt";

export const authenticateUser = async (dto: LoginDTO): Promise<{
  token: string;
  user: UserResponseDTO;
}> => {
  
  const user = USERS.find(u => u.email === dto.email);
  
  if (!user) {
    throw new AppError("Credenciales inválidas", 401);
  }
  
  if (!user.isActive) {
    throw new AppError("Usuario desactivado", 403);
  }
  
  if (!validatePassword(dto.password, user.password)) {
    throw new AppError("Credenciales inválidas", 401);
  }
  
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      brokerKey: user.brokerKey
    }
  };
};
