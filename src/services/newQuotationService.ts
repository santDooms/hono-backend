import { getPersonInfo, getVehicleInfo } from "./external_services";

export const checkPersonInfo = async (cedula: string) => {
    try {
        const personInfo = await getPersonInfo(cedula);
        return personInfo;
    } catch (error) {
        console.error("Error no person info:", error);
        return null;
    }
}

export const checkVehicleInfo = async (placa: string) => {
    try {
        const vehicleInfo = await getVehicleInfo(placa);
        return vehicleInfo;
    } catch (error) {
        console.error("Error no vehicle info:", error);
        return null;
    }
}
    