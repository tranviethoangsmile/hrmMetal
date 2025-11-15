import {ITaxDependentRepo} from '../interfaces';
import { TaxDependent } from '../../models';

class TaxDependentRepository implements ITaxDependentRepo {
    async CREATE(taxDependentValue: any) {
        try {
            const taxDependent: TaxDependent | null = await TaxDependent.create({
                ...taxDependentValue,
            });
            if (taxDependent === null) {
                return {
                    success: false,
                    message: 'create tax dependent error',
                };
            }
            return {
                success: true,
                data: taxDependent,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
}

export default TaxDependentRepository;