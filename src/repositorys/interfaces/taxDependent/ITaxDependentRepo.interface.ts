import { TaxDependent } from '../../../models';
interface ITaxDependentRepo {
    CREATE(taxDependentValue: any): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    // update(taxDependent: TaxDependent): Promise<TaxDependent>;
    DELETE(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    // getById(id: string): Promise<TaxDependent>;
    // getAll(): Promise<TaxDependent[]>;
}

export { ITaxDependentRepo };