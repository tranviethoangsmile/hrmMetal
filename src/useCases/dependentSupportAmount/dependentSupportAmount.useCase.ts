import { DependentSupportAmountRepo } from "../../repositorys";
import { validate_create_dependent_support_amount } from "../../validates";
import { getTaxDependentByIdUsecase } from "../../useCases";
const dependentSupportAmount = new DependentSupportAmountRepo()

const create_dependent_support_amount_usecase = async (createDependentSupportAmountValue: any) => {
    try {
        const isValid = validate_create_dependent_support_amount(createDependentSupportAmountValue);
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }

        const taxDependent = await getTaxDependentByIdUsecase(createDependentSupportAmountValue?.tax_dependent_id)
        if(!taxDependent?.success){
            return {
                success: false,
                message: `${taxDependent?.message}`
            }
        }
        const denpendentSupportAmount = await dependentSupportAmount.CREATE(createDependentSupportAmountValue)
        if(!denpendentSupportAmount?.success){
            return {
                success: false,
                message: denpendentSupportAmount?.message
            }
        }
        return {
            success: true,
            data: denpendentSupportAmount?.data
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
}

export {create_dependent_support_amount_usecase}