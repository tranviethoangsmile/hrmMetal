import { DependentSupportAmountRepo } from "../../repositorys";
import { DependentSupportAmount } from "../../models";
import {
    validate_create_dependent_support_amount,
    validate_update_dependent_support_amount,
    validation_id,
    validate_delete_dependent_support_amount
} from "../../validates";
import {
    getTaxDependentByIdUsecase,
    getUserByIdUseCase
} from "../../useCases";
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

        const user = await getUserByIdUseCase(createDependentSupportAmountValue?.user_id)
        if(!user?.success){
            throw new Error(`${user?.message}`)
        }

        // Check for duplicate tax_dependent_id + year
        const existingRecord = await DependentSupportAmount.findOne({
            where: {
                tax_dependent_id: createDependentSupportAmountValue?.tax_dependent_id,
                year: createDependentSupportAmountValue?.year
            }
        });
        if(existingRecord) {
            throw new Error(`Support amount record for this tax dependent and year already exists`);
        }

        const dependentSupportAmountResult = await dependentSupportAmount.CREATE(createDependentSupportAmountValue)
        if(!dependentSupportAmountResult?.success){
            return {
                success: false,
                message: dependentSupportAmountResult?.message
            }
        }
        return {
            success: true,
            data: dependentSupportAmountResult?.data
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
}

const update_dependent_support_amount_usecase = async (updateDependentSupportAmountValue: any) => {
    try {
        const isValid = validate_update_dependent_support_amount(updateDependentSupportAmountValue);
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }
        const dependentSpAmount = await dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(updateDependentSupportAmountValue?.id)
        if(dependentSpAmount?.data?.user_id !== updateDependentSupportAmountValue?.user_id){
            throw new Error(`You are not authorized to update this dependent support amount`)
        }
        const dependentSupportAmountResult = await dependentSupportAmount.UPDATE(updateDependentSupportAmountValue)
        if(!dependentSupportAmountResult?.success){
            return {
                success: false,
                message: dependentSupportAmountResult?.message
            }
        }
        return {
            success: true
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
};

const update_confirm_dependent_support_amount_usecase = async (id: string) =>{
    try {
        const isValid = validation_id(id);
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }
        const result = await dependentSupportAmount.UPDATE_CONFIRM_BY_ADMIN(id);
        if(!result?.success){
            throw new Error(`${result?.message}`)
        }
        return {
            success: true
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
};

const delete_dependent_support_amount_usecase = async (deleteValue: any) => {
    try {
        const isValid = validate_delete_dependent_support_amount(deleteValue);
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }

        // Check authorization - user can only delete their own records
        const dependentSpAmount = await dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(deleteValue?.id);
        if(!dependentSpAmount?.success){
            throw new Error(`Dependent support amount not found`);
        }

        if(dependentSpAmount?.data?.user_id !== deleteValue?.user_id){
            throw new Error(`You are not authorized to delete this dependent support amount`);
        }

        const result = await dependentSupportAmount.DELETE(deleteValue?.id, deleteValue?.user_id);
        if(!result?.success){
            throw new Error(`${result?.message}`)
        }
        return {
            success: true
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
};

const get_dependent_support_amount_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }
        const result = await dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(id);
        if(!result?.success){
            throw new Error(`${result?.message}`)
        }
        return {
            success: true,
            data: result?.data
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`
        }
    }
};


export {
    create_dependent_support_amount_usecase, 
    update_dependent_support_amount_usecase,
    update_confirm_dependent_support_amount_usecase, 
    delete_dependent_support_amount_usecase,
    get_dependent_support_amount_usecase,
};