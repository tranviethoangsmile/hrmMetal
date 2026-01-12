import { IDependentSupportAmountRepo } from "../interfaces";
import { DependentSupportAmount, TaxDependent, User } from "../../models";


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

    async UPDATE(updateDependentSupportAmountValue: any){
        try {
            const result = await DependentSupportAmount.update(
                {
                    ...updateDependentSupportAmountValue
                }, {
                    where: {
                        id: updateDependentSupportAmountValue?.id,
                        is_confirm: false
                    }
                }
            )
            if(result?.toString() !== '1') {
                throw new Error("UPDATE DEPENDENT SUPPORT AMOUNT FAILED");
            }
            return {
                success: true
            }
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
    async UPDATE_CONFIRM_BY_ADMIN(id: string){
        try {
            const result = await DependentSupportAmount.update({
                is_confirm: true
            }, {
                where: {
                    id: id
                }
            })
            if(result?.toString() !== '1') {
                throw new Error("UPDATE DEPENDENT SUPPORT AMOUNT FAILED");
            }
            return {
                success: true
            }
        } catch (error:any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
    async DELETE(id: string, user_id: string){
        try {
            const result = await DependentSupportAmount.destroy({
                where: {
                    id: id,
                    user_id: user_id
                }
            })
            if(result !== 1) {
                throw new Error(`delete dependent support amount failed`)
            }
            return {
                success: true
            }
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
    async GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(id: string) {
        try {
            const dependentSupportAmount: DependentSupportAmount | null = await DependentSupportAmount.findByPk(id, {
                attributes: [
                    'id', 
                    'user_id',
                    'year',
                    'supported_amount',
                    'is_supporting_current_year',
                    'expected_support_years',
                    'is_confirm',
                    'notes',
                    'media_path',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        as: 'userDetail',
                        attributes:[
                            'id',
                            'name',
                            'user_name',
                            'employee_id',
                            'is_active',
                            'position',
                            'is_admin',
                            'is_officer',
                            'avatar',
                        ]
                    },
                    {
                        model: TaxDependent,
                        as: 'taxDependentDetail'
                    }
                ]
            })
            if(dependentSupportAmount === null) {
                throw new Error (`dependent support amount not found`)
            }
            return {
                success: true,
                data: dependentSupportAmount,
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