import { TaxDependentRepository } from '../../repositorys';
import {
    TaxDependentStatusEnum,
    TaxDependentRelationshipEnum,
    TaxDependentGenderEnum,
} from '../../enum';
import { validate_create_tax_dependent, validation_id, validate_update_tax_dependent } from '../../validates';
import { findUserById } from '../index';
import { ICreateTaxDependent } from '../../interfaces';
import { isValidEnumValue } from '../../helpers';
const taxDependentRepository = new TaxDependentRepository();
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

const updateTaxDependentWithIdUseCase = async (updateValue: any) => {
    try {
        const valid = validate_update_tax_dependent(updateValue);
        if (valid?.error) {
            throw new Error(`${valid.error.message}`);
        }
        const taxDependent = await taxDependentRepository.GET_BY_ID(updateValue.id);
        if (!taxDependent?.success) {
            throw new Error(`${taxDependent?.message}`);
        }
        if (taxDependent?.data?.user_id !== updateValue.user_id) {
            throw new Error(`You are not authorized to update this tax dependent`);
        }
        const updateResult = await taxDependentRepository.UPDATE(updateValue);
        if (!updateResult?.success) {
            throw new Error(`${updateResult?.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
}

const updateTaxDependentStatusWithIdUseCase = async (updateStatusValue: any) => {
    try {
        const isValid = validation_id(updateStatusValue?.id);
        if (isValid?.error) {
            throw new Error(`Validation Error: ${isValid?.error.message}`);
        }
        if (!isValidEnumValue(updateStatusValue?.status, TaxDependentStatusEnum)) {
            throw new Error(`Status is not valid`);
        }
        const taxDependent = await taxDependentRepository.GET_BY_ID(updateStatusValue?.id);
        if (!taxDependent?.success) {
            throw new Error(`${taxDependent?.message}`);
        }
        const updateResult = await taxDependentRepository.UPDATE_STATUS(updateStatusValue);
        if (!updateResult?.success) {
            throw new Error(`${updateResult?.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
}

const getTaxDependentByUserIdUseCase = async (user_id: string) => {
    try {
        const isValid = validation_id(user_id);
        if (isValid?.error) {
            throw new Error(`Validation Error: ${isValid?.error.message}`);
        }
        const user = await findUserById(user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const taxDependents = await taxDependentRepository.GET_ALL_BY_USER_ID(user_id);
        if (!taxDependents?.success) {
            throw new Error(`${taxDependents?.message}`);
        }
        return {
            success: true,
            data: taxDependents?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
}

const getTaxDependentByIdUsecase = async (id: string) => {
    try {
        const isValid = validation_id(id)
        if(isValid?.error){
            throw new Error(`${isValid?.error.message}`)
        }
        const taxDependent = await taxDependentRepository.GET_TAX_DEPENDENT_BY_ID(id);
        if(!taxDependent?.success){
            throw new Error(`${taxDependent?.message}`)
        }

        return {
            success: true,
            data: taxDependent?.data
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || 'Internal server error',
        };
    }
}

export { createTaxDependentUseCase, deleteTaxDependentWithIdUseCase, updateTaxDependentWithIdUseCase, getTaxDependentByUserIdUseCase, updateTaxDependentStatusWithIdUseCase, getTaxDependentByIdUsecase };