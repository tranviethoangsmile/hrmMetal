import { getEnumForAdminUsecase } from "../../../useCases";

const getEnumForAdminControler = async () => {
    return await getEnumForAdminUsecase();
}

export { getEnumForAdminControler };