import { Checkin } from '../../models';

const create_checkin = async (data: any) => {
    try {
        const create_value_checkin: Checkin | null = await Checkin.create({
            ...data,
        });
        if (create_value_checkin != null) {
            return {
                success: true,
                data: create_value_checkin,
            };
        } else {
            return {
                success: false,
                message: 'create checkin false',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const update_checkin = async (field: any) => {
    try {
        const update_value_checkin = await Checkin.update(
            {
                time_out: field.time_out,
                over_time: field.over_time,
                work_time: field.work_time,
            },
            {
                where: {
                    user_id: field.user_id,
                    date: field.date,
                    work_shift: field.work_shift,
                },
            },
        );
        if (update_value_checkin[0] > 0) {
            return {
                success: true,
                data: `Update ${update_value_checkin[0]} record`,
            };
        } else {
            return {
                success: false,
                message: 'update false',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const isChecked = async (field: any) => {
    try {
        const is_checked: Checkin | null = await Checkin.findOne({
            where: {
                ...field,
            },
        });
        if (is_checked != null) {
            return {
                success: true,
                data: is_checked,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export { create_checkin, update_checkin, isChecked };
