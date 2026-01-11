import { 
    create_dependent_support_amount_usecase, 
    update_dependent_support_amount_usecase, 
    update_confirm_dependent_support_amount_usecase,
    delete_dependent_support_amount_usecase,
    get_dependent_support_amount_usecase
} from "../../useCases";

const create_dependent_support_amount_controller = async (createDependenSupportAmount: any) => {
    return create_dependent_support_amount_usecase(createDependenSupportAmount)
}
const update_dependent_support_amount_controller = async (updateDependenSupportAmount: any) => {
    return update_dependent_support_amount_usecase(updateDependenSupportAmount)
}
const update_confirm_dependent_support_amount_controller = async (id: string) => {
    return update_confirm_dependent_support_amount_usecase(id)
}
const delete_dependent_support_amount_controller = async (deleteValue: any) => {
    return delete_dependent_support_amount_usecase(deleteValue)
}
const get_dependent_support_amount_controller = async (id: string) => {
    return get_dependent_support_amount_usecase(id)
}
export { 
    create_dependent_support_amount_controller, 
    update_dependent_support_amount_controller, 
    update_confirm_dependent_support_amount_controller,
    delete_dependent_support_amount_controller,
    get_dependent_support_amount_controller,
};