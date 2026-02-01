import { CreateQuotationDTO } from "../schemas/quotation_schemas";
import { PersonResponseDTO, VehicleResponseDTO } from "../schemas/services_schemas";
import { Quotation } from "../types";
import { DateTime } from "luxon";

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

const calculateVigency = (date : DateTime): { desde: string; hasta: string } => {
  const lastDate = date.plus({ days: 30 });
  
  return {
    desde: date.toISO()!,
    hasta: lastDate.toISO()!
  };
};

export const parseQuotationItem = (dto: CreateQuotationDTO, personInfo: PersonResponseDTO, vehicleInfo: VehicleResponseDTO ): Quotation => {
  const nowBog = DateTime.now().setZone("America/Bogota");
  const vigencia = calculateVigency(nowBog);
  const parsedItem: Quotation = { ...QUOTATION_ITEM_TEMPLATE };
  parsedItem.cedula = personInfo.cedula;
  parsedItem.placa = dto.placa;
  parsedItem.brokerKey = dto.brokerKey;
  parsedItem.nombre = personInfo.nombre;
  parsedItem.vehiculo = vehicleInfo.vehiculo;
  parsedItem.marca = vehicleInfo.marca;
  parsedItem.modelo = vehicleInfo.modelo.toString();
  parsedItem.createdAt = nowBog.toISO()!;
  parsedItem.policyId = `pol-${nowBog.toMillis()}`;
  parsedItem.vigenciaDesde = vigencia.desde;
  parsedItem.vigenciaHasta = vigencia.hasta;
  return parsedItem;
};