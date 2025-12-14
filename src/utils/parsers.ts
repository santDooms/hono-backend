import { CreateQuotationDTO } from "../schemas/quotation_schemas";
import { PersonResponseDTO, VehicleResponseDTO } from "../schemas/services_schemas";
import { Quotation } from "../types";

const QUOTATION_ITEM_TEMPLATE : Quotation = {
  policyId: "",
  cedula: "",
  placa: "",
  brokerKey: "",
  createdAt: "",
  vigenciaDesde: "",
  vigenciaHasta: "",
  nombre: "",
  vehiculo: "",
  marca: "",
  modelo: "",
  valorPrima: 0,
};

const calculateVigency = (): { desde: string; hasta: string } => {
  const currentDate = new Date();
  const lastDate = new Date(currentDate);
  lastDate.setDate(lastDate.getDate() + 30);
  
  return {
    desde: currentDate.toISOString(),
    hasta: lastDate.toISOString()
  };
};

export const parseQuotationItem = (dto: CreateQuotationDTO, personInfo: PersonResponseDTO, vehicleInfo: VehicleResponseDTO ): Quotation => {
  const now = new Date();
  const vigencia = calculateVigency();
  const parsedItem: Quotation = { ...QUOTATION_ITEM_TEMPLATE };
  parsedItem.cedula = personInfo.cedula;
  parsedItem.placa = dto.placa;
  parsedItem.brokerKey = dto.brokerKey;
  parsedItem.nombre = personInfo.nombre;
  parsedItem.vehiculo = vehicleInfo.vehiculo;
  parsedItem.marca = vehicleInfo.marca;
  parsedItem.modelo = vehicleInfo.modelo.toString();
  parsedItem.createdAt = now.toISOString();
  parsedItem.policyId = `pol-${now.getTime()}`;
  parsedItem.vigenciaDesde = vigencia.desde;
  parsedItem.vigenciaHasta = vigencia.hasta;
  return parsedItem;
};