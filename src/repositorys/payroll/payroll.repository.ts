import { Payroll } from '../../models';

const create_payroll_repo = async (field: any) => {
    try {
        const event: Payroll | null = await Payroll.create({
            ...field,
        });
        if (event == null) {
            throw new Error('Error creating payroll');
        }
        return {
            success: true,
            data: event,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const destroy_payroll_repo = async (id: string) => {
    try {
        const result = await Payroll.destroy({
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

const update_payroll_repo = async (field: any) => {
    try {
        const payroll = await Payroll.update(
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

const search_payroll_by_id_repo = async (id: string) => {
    try {
        const payroll: Payroll | null = await Payroll.findOne({
            where: {
                id: id,
            },
        });
        if (payroll == null) {
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

const search_payroll_of_user_in_month_repo = async (field: any) => {
    try {
        const payroll: Payroll | null = await Payroll.findOne({
            where: {
                ...field,
                is_active: true,
            },
            attributes: [
                'user_id',
                'date',
                'pay_date',
                'work_time',
                'over_time',
                'paid_vacation_days',
                'weekend_time',
                'shift_night',
                'paid_vacation_pay',
                'work_salary',
                'shift_night_salary',
                'over_time_salary',
                'refund_money',
                'other_pay',
                'weekend_salary',
                'attendance_allowance_pay',
                'travel_allowance_pay',
                'bonus_pay',
                'gross_salary',
                'income_tax',
                'social_insurance',
                'health_insurance',
                'uniform_deduction',
                'accident_insurance',
                'club_fee',
                'rent_home',
                'cost_of_living',
                'other_deduction',
                'net_salary',
            ],
        });
        if (payroll == null) {
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

export {
    create_payroll_repo,
    destroy_payroll_repo,
    update_payroll_repo,
    search_payroll_by_id_repo,
    search_payroll_of_user_in_month_repo,
};
