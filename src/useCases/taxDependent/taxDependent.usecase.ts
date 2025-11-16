import { TaxDependentRepository } from '../../repositorys';
import {
    TaxDependentStatusEnum,
    TaxDependentRelationshipEnum,
    TaxDependentGenderEnum,
} from '../../enum';
import { validate_create_tax_dependent } from '../../validates';
import { findUserById } from '../index';
import { ICreateTaxDependent } from '../../interfaces';

const taxDependentRepository = new TaxDependentRepository();

// Helper function để validate enum values
const isValidEnumValue = <T extends Record<string, string>>(
    value: string,
    enumObject: T
): boolean =>{
    return Object.values(enumObject).includes(value as T[keyof T])
}
const createTaxDependentUseCase = async (
    createValue: ICreateTaxDependent
) => {
    try {
        // Validate input với Joi
        const valid = validate_create_tax_dependent(createValue);
        if (valid?.error) {
            return {
                success: false,
                message: valid.error.message,
            };
        }

        // Validate enum values
        if (
            !isValidEnumValue(
                createValue.gender,
                TaxDependentGenderEnum
            )
        ) {
            return {
                success: false,
                message: 'Gender is not valid',
            };
        }

        if (
            !isValidEnumValue(
                createValue.relationship,
                TaxDependentRelationshipEnum
            )
        ) {
            return {
                success: false,
                message: 'Relationship is not valid',
            };
        }

        if (
            createValue.status &&
            !isValidEnumValue(createValue.status, TaxDependentStatusEnum)
        ) {
            return {
                success: false,
                message: 'Status is not valid',
            };
        }

        // Check user exists
        const user = await findUserById(createValue.user_id);
        if (!user?.success) {
            return {
                success: false,
                message: 'User not found',
            };
        }

        // Create tax dependent
        const taxDependent =
            await taxDependentRepository.CREATE(createValue);

        if (!taxDependent?.success) {
            return {
                success: false,
                message: taxDependent?.message || 'Failed to create tax dependent',
            };
        }

        return {
            success: true,
            data: taxDependent?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
};

export { createTaxDependentUseCase };