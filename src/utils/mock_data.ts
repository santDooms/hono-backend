import { PersonResponseDTO, VehicleResponseDTO } from "../schemas/services_schemas";

export const personMockData: Record<string, PersonResponseDTO>= {
  "123456": {
    nombre: "Juan Pérez",
    edad: 35,
    cedula: "123456",
    direccion: "Av. Principal 123",
    estadoCivil: "Soltero",
    tipoIdentificacion: "cc",
  },
  "123456789": {
    nombre: "María García",
    edad: 28,
    cedula: "123456789",
    direccion: "Calle Secundaria 456",
    estadoCivil: "Casada",
    tipoIdentificacion: "ce",
  },
};

export const vehicleMockData: Record<string, VehicleResponseDTO> = {
  "ABC-123": {
    vehiculo: "Toyota Corolla",
    marca: "Toyota",
    modelo: 2023,
    color: "Blanco",
    valor: 25000,
    anio: 2023,
    tipo: "automovil",
  },
  "XYZ-789": {
    vehiculo: "Honda Civic",
    marca: "Honda",
    modelo: 2022,
    color: "Negro",
    valor: 22000,
    anio: 2022,
    tipo: "automovil",
  },
};