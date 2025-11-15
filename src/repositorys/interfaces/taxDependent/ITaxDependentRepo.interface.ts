import { TaxDependent } from '../../../models';
import { ICreateTaxDependent } from '../../../interfaces';
interface ITaxDependentRepo {
    CREATE(taxDependentValue: any): Promise<{
        success: boolean;
        data?: TaxDependent;
        message?: string;
    }>;
    // update(taxDependent: TaxDependent): Promise<TaxDependent>;
    // delete(id: string): Promise<void>;
    // getById(id: string): Promise<TaxDependent>;
    // getAll(): Promise<TaxDependent[]>;
}

export { ITaxDependentRepo };