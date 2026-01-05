import { TaxDependent } from '../../../models';
interface ITaxDependentRepo {
    CREATE(taxDependentValue: any): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    UPDATE(taxDependentValue: any): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    UPDATE_STATUS(updateStatusValue: any): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    DELETE(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    GET_BY_ID(id: string): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    GET_ALL_BY_USER_ID(user_id: string): Promise<{
        success: boolean;
        data?: TaxDependent[];
        message?: string;
    }>;
}

export { ITaxDependentRepo };