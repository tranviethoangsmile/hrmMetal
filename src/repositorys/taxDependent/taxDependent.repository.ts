import {ITaxDependentRepo} from '../interfaces';
import { TaxDependent } from '../../models';

class TaxDependentRepository implements ITaxDependentRepo {
    async CREATE(taxDependentValue: any) {
        try {
            const taxDependent = await TaxDependent.create({
                ...taxDependentValue,
            });
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

    async DELETE(id: string) {
        try {
            const deleteResult = await TaxDependent.destroy({
                where: {
                    id: id,
                },
            });
            if (deleteResult < 1) {
                throw new Error(`delete tax dependent with ID: ${id} failed`);
            }
            return {
                success: true,
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