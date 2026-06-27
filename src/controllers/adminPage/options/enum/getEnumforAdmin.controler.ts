import { getEnumForAdminUsecase } from "../../../../useCases";

const GET_ENUM_FOR_ADMIN_CONTROLLER = async () => {
    return await getEnumForAdminUsecase();
}

export { GET_ENUM_FOR_ADMIN_CONTROLLER };