import {
    daily_report_create,
    find_all_report_of_department,
    find_report,
    find_daily_report_by_id,
} from '../../repositorys/dailyReport/dailyReport.repository';
import {
    create_daily_report,
    search_report,
} from '../../interfaces/dailyReport/dailyReport.interface';
import {
    valid_create_daily_report,
    valid_search_daily_report,
} from '../../validates/dailyReport/dailyReport.validate';
import { validation_id } from '../../validates';
import { Products } from '../../enum/product.enum';
import { findUserById } from '../user/user.useCase';
import { shift } from '../../enum/shift.enum';
import {
    update_inventory_repo,
    search_inventory_with_name,
    create,
} from '../../repositorys/inventory/inventory.repo';
import { getDepartmentById } from '../../repositorys/department/department.repository';
import db from '../../dbs/db';
const create_daily_report_use = async (field: create_daily_report) => {
    const t = await db.transaction();
    try {
        const isValid = valid_create_daily_report(field);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const user = await findUserById(field.user_id);
        if (!user?.success) {
            throw new Error(user?.message || 'User not found');
        }

        if (!Object.values(Products).includes(field.product)) {
            throw new Error('Product name not valid');
        }

        if (!Object.values(shift).includes(field.shift)) {
            throw new Error('Shift name not valid');
        }

        const department = await getDepartmentById(field.department_id);
        if (!department?.success) {
            throw new Error(department?.message || 'Department not found');
        }

        const report = await daily_report_create(field);
        if (!report?.success) {
            throw new Error(report?.message || 'Failed to create daily report');
        }
        const field_search = {
            product: field.product,
        };
        let second_value;
        let inventory;

        const inventorys = await search_inventory_with_name({
            ...field_search,
        });
        if (!inventorys?.success) {
            if (user?.data?.department?.name != '加工') {
                const create_inventory = await create({
                    product: field.product,
                    quantity: 0,
                    department_id: field.department_id,
                });
                if (!create_inventory?.success) {
                    throw new Error(
                        create_inventory?.message ||
                            'Failed to create inventory',
                    );
                } else {
                    inventory = create_inventory?.data;
                }
            }
        } else {
            inventory = inventorys.data?.[0];
        }
        const first_value = inventory?.quantity;
        if (first_value == undefined) {
            throw new Error('Failed to get inventory quantity');
        }
        if (user?.data?.department?.name === '加工') {
            second_value = first_value - field.quantity;
        } else {
            second_value = first_value + field.quantity;
        }

        const update_inventory = await update_inventory_repo({
            quantity: second_value,
            product: field.product,
        });
        if (!update_inventory?.success) {
            throw new Error(
                update_inventory?.message || 'Failed to update inventory',
            );
        }
        await t.commit();
        return { success: true, data: report?.data };
    } catch (error: any) {
        await t.rollback();
        return { success: false, message: error?.message || 'Unknown error' };
    }
};

const search_daily_report = async (data: search_report) => {
    try {
        const valid = valid_search_daily_report(data);
        if (!valid?.error) {
            const reports = await find_report(data);
            if (reports?.success) {
                return {
                    success: true,
                    data: reports?.data,
                };
            } else {
                return {
                    success: false,
                    message: 'report not found',
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_report_use = async (field: search_report) => {
    try {
        const dailyReports = await find_all_report_of_department({
            ...field,
        });
        if (!dailyReports?.success) {
            throw new Error(dailyReports?.message);
        }
        return {
            success: true,
            data: dailyReports?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};

const find_rp_by_id = async (id: any) => {
    try {
        const valid = await validation_id(id);
        if (!valid?.error) {
            const report = await find_daily_report_by_id(id);
            console.log(report);
            if (report?.success) {
                return {
                    success: true,
                    data: report?.data,
                };
            } else {
                return {
                    success: false,
                    message: report?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    create_daily_report_use,
    find_all_report_use,
    search_daily_report,
    find_rp_by_id,
};
