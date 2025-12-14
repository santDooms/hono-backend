import { PersonResponseDTO, PersonResponseSchema, VehicleResponseDTO, VehicleResponseSchema } from "../schemas/services_schemas";
import { personMockData, vehicleMockData } from "../utils/mock_data";

export const getPersonInfo = async (
  cedula: string
): Promise<PersonResponseDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 65000));

  return PersonResponseSchema.parse(personMockData[cedula]);
};

export const getVehicleInfo = async (
  placa: string
): Promise<VehicleResponseDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 50000));

  return VehicleResponseSchema.parse(vehicleMockData[placa]);
};

export const calculatePrima = (personInfo: any, vehicleInfo: any): number => {
  const base = 100;
  const valorVehiculo = vehicleInfo.valor || 15000;
  const factorEdad = personInfo.edad < 30 ? 1.2 : 1.0;
  const factorHistorial = personInfo.historial === "A" ? 0.9 : 1.1;
  
  return Math.round((valorVehiculo * 0.02 + base) * factorEdad * factorHistorial);
};