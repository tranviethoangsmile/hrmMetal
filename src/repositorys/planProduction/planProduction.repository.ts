import { Department, PlanProduction } from '../../models';
import { Op } from 'sequelize';
const create_plan_production_repo = async (field: any) => {
    try {
        const plan_production: PlanProduction | null =
            await PlanProduction.create({ ...field });
        if (plan_production == null) {
            throw new Error('Error creating plan production');
        }
        return {
            success: true,
            data: plan_production,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error?.message}`,
        };
    }
};
const update_plan_production_repo = async (field: any) => {
    try {
        const payroll = await PlanProduction.update(
            { ...field },
            {
                where: {
                    id: field.id,
                },
            },
        );

        if (payroll[0] !== 1) {
            throw new Error('Error updating payroll');
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const search_plan_production_by_id_repo = async (id: string) => {
    try {
        const payroll: PlanProduction | null = await PlanProduction.findOne({
            where: {
                id: id,
            },
            attributes: [
                'id',
                'date',
                'department_id',
                'position',
                'quantity',
                'product',
                'operation_time',
                'work_shift',
                'production_line',
                'is_custom',
            ],
            include: [
                {
                    model: Department,
                    attributes: ['id', 'name'],
                },
            ],
        });
        if (payroll === null) {
            throw new Error('payroll not found or not avaliable');
        }
        return {
            success: true,
            data: payroll,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};
const destroy_plan_production_repo = async (id: string) => {
    try {
        const result = await PlanProduction.destroy({
            where: {
                id: id,
            },
        });
        if (result !== 1) {
            throw new Error('Error deleting payroll');
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const search_plan_production_seven_day_of_department_repo = async (
    field: any,
) => {
    try {
        const payrolls: PlanProduction[] | null = await PlanProduction.findAll({
            where: {
                department_id: field.department_id,
                date: {
                    [Op.gte]: field.start_date,
                    [Op.lte]: field.end_date,
                },
            },
            attributes: [
                'id',
                'date',
                'department_id',
                'position',
                'quantity',
                'product',
                'operation_time',
                'work_shift',
                'production_line',
                'is_custom',
            ],
            include: [
                {
                    model: Department,
                    attributes: ['id', 'name'],
                },
            ],
        });

        return {
            success: true,
            data: payrolls,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

export {
    create_plan_production_repo,
    update_plan_production_repo,
    search_plan_production_by_id_repo,
    destroy_plan_production_repo,
    search_plan_production_seven_day_of_department_repo,
};
