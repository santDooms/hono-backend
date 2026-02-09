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

export const parseQuotationItem = (dto: CreateQuotationDTO, personInfo: PersonResponseDTO | null, vehicleInfo: VehicleResponseDTO | null ): Quotation => {
  const parsedItem: Quotation = { ...QUOTATION_ITEM_TEMPLATE };
  const nowBog = DateTime.now().setZone("America/Bogota");
  const vigencia = calculateVigency(nowBog);
  parsedItem.createdAt = nowBog.toISO()!;
  parsedItem.policyId = `pol-${nowBog.toMillis()}`;
  parsedItem.vigenciaDesde = vigencia.desde;
  parsedItem.vigenciaHasta = vigencia.hasta;
  parsedItem.brokerKey = dto.brokerKey;
  parsedItem.placa = dto.placa;
  parsedItem.tipoPlaca = dto.tipoPlaca;
  parsedItem.cedula = dto.cedula;
  parsedItem.tipoIdentificacion = dto.tipoIdentificacion;
  parsedItem.quotationStep = "vehicleStep";
  if (personInfo) {
    parsedItem.nombre = personInfo.nombre;
    parsedItem.edad = personInfo.edad;
    parsedItem.direccion = personInfo.direccion;
    parsedItem.estadoCivil = personInfo.estadoCivil;
  }
  if (vehicleInfo) {
    parsedItem.vehiculo = vehicleInfo.vehiculo;
    parsedItem.marca = vehicleInfo.marca;
    parsedItem.modelo = vehicleInfo.modelo.toString();
    parsedItem.color = vehicleInfo.color;
    parsedItem.valor = vehicleInfo.valor;
    parsedItem.anio = vehicleInfo.anio;
    parsedItem.tipo = vehicleInfo.tipo;
  }
  return parsedItem;
};