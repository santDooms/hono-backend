import { AppError } from "../middlewares/error_handler";
import { PersonResponseDTO, PersonResponseSchema, VehicleResponseDTO, VehicleResponseSchema } from "../schemas/services_schemas";
import { personMockData, vehicleMockData } from "../utils/mock_data";

export const getPersonInfo = async (
  cedula: string
): Promise<PersonResponseDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 6500));

  const parsed = PersonResponseSchema.safeParse(personMockData[cedula]);

  if (!parsed.success) {
    const err: any = new Error("Person data validation failed");
    err.type = "VALIDATION_ERROR";
    err.details = parsed.error.issues;
    throw new AppError("Person data validation failed", 400, parsed.error.issues, "VALIDATION_ERROR");
  }
  return parsed.data;
};

export const getVehicleInfo = async (
  placa: string
): Promise<VehicleResponseDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const parsed = VehicleResponseSchema.safeParse(vehicleMockData[placa]);

  if (!parsed.success) {
    const err: any = new Error("Vehicle data validation failed");
    err.type = "VALIDATION_ERROR";
    err.details = parsed.error.issues;
    throw new AppError("Vehicle data validation failed", 400, parsed.error.issues, "VALIDATION_ERROR");
  }
  return parsed.data;
};

export const calculatePrima = (personInfo: any, vehicleInfo: any): number => {
  const base = 100;
  const valorVehiculo = vehicleInfo.valor || 15000;
  const factorEdad = personInfo.edad < 30 ? 1.2 : 1.0;
  const factorHistorial = personInfo.historial === "A" ? 0.9 : 1.1;
  
  return Math.round((valorVehiculo * 0.02 + base) * factorEdad * factorHistorial);
};