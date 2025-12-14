import { User } from "../types";

export const USERS: User[] = [
  {
    id: "1",
    email: "admin@seguros.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
    createdAt: new Date(),
    isActive: true,
    brokerKey: "123"
  },
  {
    id: "2", 
    email: "broker1@seguros.com",
    password: "broker123",
    name: "Juan Pérez",
    role: "broker",
    brokerKey: "789456",
    createdAt: new Date(),
    isActive: true
  },
  {
    id: "3",
    email: "broker2@seguros.com", 
    password: "broker123",
    name: "María García",
    role: "broker",
    brokerKey: "123456",
    createdAt: new Date(),
    isActive: true
  },
  {
    id: "4",
    email: "cliente@test.com",
    password: "cliente123",
    name: "Cliente Test",
    role: "user",
    createdAt: new Date(),
    isActive: true,
    brokerKey: "741852"
  }
];
