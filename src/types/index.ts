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
  [k: string]: unknown;
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