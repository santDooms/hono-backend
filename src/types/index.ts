export interface Quotation {
  policyId: string;           
  createdAt: string;          
  vigenciaDesde?: string;      
  vigenciaHasta?: string;              
  brokerKey: string;          
  cedula: string;             
  placa: string;              
  nombre: string;            
  vehiculo?: string;          
  marca?: string;             
  modelo?: string;           
  valorPrima?: number;
  prima?: number;        
  [k: string]: unknown;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin" | "broker";
  brokerKey: string;
  createdAt: Date;
  isActive: boolean;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  brokerKey: string;
}

export interface ListQuotationsParams {
  brokerKey: string;
  limit?: number;
  nextKey?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  nextKey?: string | null;
  total?: number;
}