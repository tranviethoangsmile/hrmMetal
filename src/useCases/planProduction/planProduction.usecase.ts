import {
    create_plan_production_repo,
    update_plan_production_repo,
    search_plan_production_by_id_repo,
    destroy_plan_production_repo,
    search_plan_production_seven_day_of_department_repo,
} from '../../repositorys';
import { getDepById } from '../department/department.useCase';
import {
    validate_create_plan_production,
    validate_update_plan_production,
    validation_id,
    validate_search_plan_production_seven_day_of_department,
} from '../../validates';
import { Position, Products, shift_work } from '../../enum';
const handleProductName = (value: string) => {
    switch (value) {
        case 'D042F_PAO_DC4':
        case 'D042F_PAO_DC3':
            return 'D042F';
        case 'D93F_PAO_DC4':
        case 'D93F_PAO_DC3':
        case 'D93F_PAO_DC2':
            return 'D93F';
        case 'D860F_PAO_DC3':
            return 'D860F';
        case 'D61F_PAO_DC4':
        case 'D61F_PAO_DC2':
            return 'D61F';
        case 'D66_5':
        case 'D66_6':
        case 'D66_DC3':
            return 'D66F';
        case 'DF93_4':
        case 'DF93_3':
            return 'DF93CTC';
        case 'DK05FR_1':
        case 'DK05FR_2':
            return 'DK05FR';
        case 'DK05RR_2':
        case 'DK05RR_1':
            return 'DK05RR';
        default:
            return value;
    }
};
const create_plan_production_use = async (field: any) => {
    try {
        const isValid = validate_create_plan_production(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (!Object.values(Products).includes(field.product)) {
            throw new Error('Product is not valid');
        }
        if (!Object.values(shift_work).includes(field.work_shift)) {
            throw new Error('Work shift is not valid');
        }
        if (!Object.values(Position).includes(field.position)) {
            throw new Error('Position is not valid');
        }

        const department = await getDepById(field.department_id);
        if (!department?.success) {
            throw new Error(`${department?.message}`);
        }
        field.product = handleProductName(field.product);
        const planProduction = await create_plan_production_repo({ ...field });
        if (!planProduction?.success) {
            throw new Error(`${planProduction?.message}`);
        }
        return {
            success: true,
            data: planProduction,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`,
        };
    }
};

const search_plan_production_by_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const planProduction = await search_plan_production_by_id_repo(id);
        if (!planProduction?.success) {
            throw new Error(`${planProduction?.message}`);
        }
        return {
            success: true,
            data: planProduction?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`,
        };
    }
};

const update_plan_production_use = async (field: any) => {
    try {
        const isValid = validate_update_plan_production(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const plan_production = await search_plan_production_by_id_use(
            field.id,
        );
        if (!plan_production?.success) {
            throw new Error(`${plan_production?.message}`);
        }
        if (field.product) {
            field.product = handleProductName(field.product);
        }
        if (field.position) {
            if (!Object.values(Position).includes(field.position)) {
                throw new Error('Position is not valid');
            }
        }
        if (field.work_shift) {
            if (!Object.values(shift_work).includes(field.work_shift)) {
                throw new Error('Work shift is not valid');
            }
        }
        const planProduction = await update_plan_production_repo({
            ...field,
        });
        if (!planProduction?.success) {
            throw new Error(`${planProduction?.message}`);
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
};

const destroy_plan_production_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const planProduction = await search_plan_production_by_id_repo(id);
        if (!planProduction?.success) {
            throw new Error(`${planProduction?.message}`);
        }
        const result = await destroy_plan_production_repo(id);
        if (!result?.success) {
            throw new Error(`${result?.message}`);
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
};

const search_plan_production_seven_day_of_department_use = async (
    field: any,
) => {
    try {
        const isValid =
            validate_search_plan_production_seven_day_of_department(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const planProduction =
            await search_plan_production_seven_day_of_department_repo({
                ...field,
            });
        if (!planProduction?.success) {
            throw new Error(`${planProduction?.message}`);
        }
        return {
            success: true,
            data: planProduction?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message}`,
        };
    }
};

export {
    create_plan_production_use,
    update_plan_production_use,
    search_plan_production_by_id_use,
    destroy_plan_production_use,
    search_plan_production_seven_day_of_department_use,
};
