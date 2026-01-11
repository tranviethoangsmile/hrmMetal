import { DependentSupportAmount } from "../../../models"

interface IDependentSupportAmountRepo {
    CREATE (createDependentSupportAmountValue:any):Promise<{
        success: boolean,
        data?: DependentSupportAmount,
        message?: string
    }>
    UPDATE(updateDependentSupportAmountValue:any):Promise<{
        success: boolean,
        message?: string
    }>
    UPDATE_CONFIRM_BY_ADMIN(id: string):Promise<{
        success: boolean,
        message?: string
    }>
    DELETE(id: string): Promise<{
        success: boolean,
        message?: string
    }>
    GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(id: string): Promise<{
        success: boolean,
        data?: DependentSupportAmount,
        message?: string 
    }>
}

export {IDependentSupportAmountRepo};