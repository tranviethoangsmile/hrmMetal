import { DependentSupportAmount } from "../../../models"

interface IDependentSupportAmountRepo {
    CREATE (createDependentSupportAmountValue:any):Promise<{
        success: boolean,
        data?: DependentSupportAmount,
        message?: string
    }>
}

export {IDependentSupportAmountRepo};