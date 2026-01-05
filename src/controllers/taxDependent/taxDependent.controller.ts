import { createTaxDependentUseCase, deleteTaxDependentWithIdUseCase, updateTaxDependentWithIdUseCase, getTaxDependentByUserIdUseCase, updateTaxDependentStatusWithIdUseCase } from "../../useCases";
import { ICreateTaxDependent } from "../../interfaces";
const createTaxDependentController = async (createValue: ICreateTaxDependent) =>{
    return await createTaxDependentUseCase(createValue)
}

const deleteTaxDependentWithIdController = async(id: string)=>{
    return await deleteTaxDependentWithIdUseCase(id)
}

const updateTaxDependentWithIdController = async(updateValue: any)=>{
    return await updateTaxDependentWithIdUseCase(updateValue)
}

const getTaxDependentByUserIdController = async(user_id: string)=>{
    return await getTaxDependentByUserIdUseCase(user_id)
}

const updateTaxDependentStatusWithIdController = async(updateStatusValue: any)=>{
    return await updateTaxDependentStatusWithIdUseCase(updateStatusValue)
}
export {createTaxDependentController, deleteTaxDependentWithIdController, updateTaxDependentWithIdController, getTaxDependentByUserIdController, updateTaxDependentStatusWithIdController}