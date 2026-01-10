import {ITaxDependentRepo} from '../interfaces';
import { TaxDependent } from '../../models';

class TaxDependentRepository implements ITaxDependentRepo {
    async CREATE(taxDependentValue: any) {
        try {
            const taxDependent: TaxDependent | null = await TaxDependent.create({
                ...taxDependentValue,
            });
            if(taxDependent === null){
                throw new Error(`Create new Tax Denpendent failed`)
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
    async UPDATE(taxDependentValue: any) {
        try {
            const taxDependent = await TaxDependent.update({...taxDependentValue}, {
                where: {
                    id: taxDependentValue.id,
                },
            });
            if (taxDependent[0] === 0) {
                throw new Error(`Failed to update tax dependent`);
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
    async UPDATE_STATUS(updateStatusValue: any) {
        try {
            const taxDependent = await TaxDependent.update({status:updateStatusValue?.status, notes: updateStatusValue?.notes}, {
                where: {
                    id: updateStatusValue?.id,
                },
            });
            if (taxDependent[0] === 0) {
                throw new Error(`Failed to update status`);
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
    async GET_BY_ID(id: string) {
        try {
            const taxDependent: TaxDependent | null = await TaxDependent.findByPk(id);
            if (taxDependent === null) {
                throw new Error(`tax dependent not found`);
            }
            return {
                success: true,
                data: taxDependent,
            };
        }
        catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
    async GET_ALL_BY_USER_ID(user_id: string) {
        try {
            const taxDependents: TaxDependent[] = await TaxDependent.findAll({
                where: {
                    user_id: user_id,
                },
            });
            if (taxDependents.length < 1) {
                throw new Error(`tax dependent not found`);
            }
            return {
                success: true,
                data: taxDependents,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }

    async GET_TAX_DEPENDENT_BY_ID(id: string){
        try {
            const taxDependent: TaxDependent | null = await TaxDependent.findByPk(id)

            if(taxDependent === null) {
                throw new Error(`tax dependent not found`)
            }
            return {
                success: true,
                data: taxDependent
            }
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
}

export default TaxDependentRepository;