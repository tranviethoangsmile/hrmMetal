import { create_dependent_support_amount_usecase } from "../../useCases";

const create_dependent_support_amount_controller = async (createDependenSupportAmount: any) => {
    return create_dependent_support_amount_usecase(createDependenSupportAmount)
}

export { create_dependent_support_amount_controller }