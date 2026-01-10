import { IDependentSupportAmountRepo } from "../interfaces";
import { DependentSupportAmount } from "../../models";


class DependentSupportAmountRepo implements IDependentSupportAmountRepo {
   async CREATE(createDependentSupportAmountValue: any){
        try {
            const dependentSupportAmount: DependentSupportAmount | null = await DependentSupportAmount.create( {
                ...createDependentSupportAmountValue
            })
            if(dependentSupportAmount === null) {
                throw new Error(`CREATE NEW DEPENDENT SUPPORT AMOUNT FAILED`)
            }
            return {
                success: true,
                data: dependentSupportAmount
            }
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
}

export default DependentSupportAmountRepo;