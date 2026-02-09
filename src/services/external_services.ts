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