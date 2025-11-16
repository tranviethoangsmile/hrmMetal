import { createTaxDependentUseCase, deleteTaxDependentWithIdUseCase } from "../../useCases";
import { ICreateTaxDependent } from "../../interfaces";
const createTaxDependentController = async (createValue: ICreateTaxDependent) =>{
    return await createTaxDependentUseCase(createValue)
}

const deleteTaxDependentWithIdController = async(id: string)=>{
    return await deleteTaxDependentWithIdUseCase(id)
}

export {createTaxDependentController, deleteTaxDependentWithIdController}