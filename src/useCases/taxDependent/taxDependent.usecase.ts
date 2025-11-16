import { TaxDependentRepository } from '../../repositorys';
import {
    TaxDependentStatusEnum,
    TaxDependentRelationshipEnum,
    TaxDependentGenderEnum,
} from '../../enum';
import { validate_create_tax_dependent, validation_id } from '../../validates';
import { findUserById } from '../index';
import { ICreateTaxDependent } from '../../interfaces';
import { isValidEnumValue } from '../../helpers';
const taxDependentRepository = new TaxDependentRepository();

// Helper function để validate enum values
// const isValidEnumValue = <T extends Record<string, string>>(
//     value: string,
//     enumObject: T
// ): boolean =>{
//     return Object.values(enumObject).includes(value as T[keyof T])
// }
const createTaxDependentUseCase = async (
    createValue: ICreateTaxDependent
) => {
    try {
        // Validate input với Joi
        const valid = validate_create_tax_dependent(createValue);
        if (valid?.error) {
            throw new Error(`${valid.error.message}`);
        }

        // Validate enum values
        if (
            !isValidEnumValue(
                createValue.gender,
                TaxDependentGenderEnum
            )
        ) {
            throw new Error(`Gender is not valid`);
        }

        if (
            !isValidEnumValue(
                createValue.relationship,
                TaxDependentRelationshipEnum
            )
        ) {
            throw new Error(`Relationship is not valid`);
        }

        if (
            createValue.status &&
            !isValidEnumValue(createValue.status, TaxDependentStatusEnum)
        ) {
            throw new Error(`Status is not valid`);
        }
        // Check user exists
        const user = await findUserById(createValue.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        // Create tax dependent
        const taxDependent =
            await taxDependentRepository.CREATE(createValue);

        if (!taxDependent?.success) {
            throw new Error(`${taxDependent?.message}`);
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

const deleteTaxDependentWithIdUseCase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`Validation Error: ${isValid?.error.message}`);
        }

        const deleteResult = await taxDependentRepository.DELETE(id);
        if (!deleteResult?.success) {
            throw new Error(`${deleteResult?.message}`);
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
};

export { createTaxDependentUseCase, deleteTaxDependentWithIdUseCase };