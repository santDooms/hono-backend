import jwt from "jsonwebtoken";
import { JwtPayload, User } from "../types";

export const generateToken = (user: User): string => {
  const payload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    brokerKey: user.brokerKey
  };

  const secretJwt = "default-secret";//TODO: FIX ENV
  const time = "1h";

  return jwt.sign(payload, secretJwt, {
    expiresIn: time,
    issuer: "seguros-backend",
    audience: "seguros-frontend"
  });
};

export const validatePassword = (inputPassword: string, storedPassword: string): boolean => {
  return inputPassword === storedPassword;
};