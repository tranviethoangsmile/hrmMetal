import { createTaxDependentUseCase } from "../../useCases";
import { ICreateTaxDependent } from "../../interfaces";
const createTaxDependentController = async (createValue: ICreateTaxDependent) =>{
    return await createTaxDependentUseCase(createValue)
}

export {createTaxDependentController}