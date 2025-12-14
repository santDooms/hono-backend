import { Quotation, PaginatedResult } from "../types";
import { saveQuotation, queryQuotationsByBrokerKey } from "../db/dynamodb_manager";
import { CreateQuotationDTO } from "../schemas/quotation_schemas";
import { getPersonInfo, getVehicleInfo } from "./external_services";
import { parseQuotationItem } from "../utils/parsers";

export const createQuotation = async (dto: CreateQuotationDTO): Promise<Quotation> => {
  const [personInfo, vehicleInfo] = await Promise.all([
    getPersonInfo(dto.cedula),
    getVehicleInfo(dto.placa),
  ]);

  const item: Quotation = parseQuotationItem(dto, personInfo, vehicleInfo);
  await saveQuotation(item);
  return item;
};

export const listByBroker = async (brokerKey: string, lastKey?: string): Promise<PaginatedResult<Quotation>> => {
  let eks;
  if (lastKey) eks = JSON.parse(Buffer.from(lastKey, "base64").toString("utf8"));
  const resp: any = await queryQuotationsByBrokerKey(brokerKey, eks);
  const items = (resp.Items ?? []) as Quotation[];
  const nextKey = resp.LastEvaluatedKey ? Buffer.from(JSON.stringify(resp.LastEvaluatedKey)).toString("base64") : null;
  return { items, nextKey };
};