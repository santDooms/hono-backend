import { Quotation, PaginatedResult } from "../types";
import { saveQuotation, queryQuotationsByBrokerKey } from "../db/dynamodb_manager";
import { CreateQuotationDTO, ListDashboardQuotationsDTO } from "../schemas/quotation_schemas";
import { parseQuotationItem } from "../utils/parsers";
import { checkPersonInfo, checkVehicleInfo } from "./newQuotationService";

export const createQuotation = async (dto: CreateQuotationDTO): Promise<Quotation> => {
  const [personInfo, vehicleInfo] = await Promise.all([
    checkPersonInfo(dto.cedula),
    checkVehicleInfo(dto.placa),
  ]);
  const item: Quotation = parseQuotationItem(dto, personInfo, vehicleInfo);
  await saveQuotation(item);
  return item;
};

export const listByBroker = async (dto: ListDashboardQuotationsDTO): Promise<PaginatedResult<Quotation>> => {
  const { brokerKey, nextKey: lastKey, limit } = dto;
  let exclusiveStartKey;
  if (lastKey) exclusiveStartKey = JSON.parse(Buffer.from(lastKey, "base64").toString("utf8"));
  const resp = await queryQuotationsByBrokerKey(brokerKey, exclusiveStartKey, limit);
  const items = resp.Items;
  const nextKey = resp.LastEvaluatedKey ? Buffer.from(JSON.stringify(resp.LastEvaluatedKey)).toString("base64") : null;
  return { items, nextKey };
};