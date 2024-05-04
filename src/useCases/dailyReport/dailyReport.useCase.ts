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
        const inventorys = await search_inventory_with_name({
            ...field_search,
        });
        if (inventorys?.success) {
            if (user?.data?.department?.name === '加工') {
                const is_avaliable = inventorys?.data?.some(
                    inventory =>
                        inventory.department_id === field.department_id,
                );
                if (!is_avaliable) {
                    const inventory = inventorys?.data?.[0];
                    const create_inventory = await create({
                        product: field.product,
                        quantity: field.quantity,
                        department_id: field.department_id,
                    });
                    if (create_inventory?.success) {
                        if (inventory?.quantity != undefined) {
                            const update_inventory_old =
                                await update_inventory_repo({
                                    quantity:
                                        inventory.quantity - field.quantity,
                                    product: field.product,
                                    department_id: inventory.department_id,
                                });
                            if (!update_inventory_old?.success) {
                                throw new Error(update_inventory_old?.message);
                            }
                        } else {
                            throw new Error('Failed to get inventory quantity');
                        }
                    } else {
                        throw new Error(create_inventory?.message);
                    }
                } else {
                    let inventory_old_of_kako: any;
                    let inventory_old: any;
                    inventorys?.data?.forEach(inventory => {
                        if (inventory?.department_id != field.department_id) {
                            inventory_old = inventory;
                        } else {
                            inventory_old_of_kako = inventory;
                        }
                    });
                    if (
                        inventory_old_of_kako?.quantity != undefined &&
                        inventory_old?.quantity != undefined
                    ) {
                        const update_kako = await update_inventory_repo({
                            quantity:
                                inventory_old_of_kako.quantity + field.quantity,
                            product: inventory_old_of_kako.product,
                            department_id: inventory_old_of_kako.department_id,
                        });
                        if (!update_kako?.success) {
                            throw new Error(update_kako?.message);
                        }
                        const update_inventory = await update_inventory_repo({
                            quantity: inventory_old.quantity - field.quantity,
                            product: inventory_old.product,
                            department_id: inventory_old.department_id,
                        });
                        if (!update_inventory.success) {
                            throw new Error(update_inventory.message);
                        }
                    } else {
                        throw new Error(
                            'inventory_old_of_kako or inventory_old is undefined',
                        );
                    }
                }
            } else {
                let inventory_old: any;
                inventorys?.data?.forEach(inventory => {
                    if (inventory?.department_id === field.department_id) {
                        inventory_old = inventory;
                    }
                });
                if (inventory_old?.quantity != undefined) {
                    const update_inventory = await update_inventory_repo({
                        quantity: inventory_old.quantity + field.quantity,
                        product: inventory_old.product,
                        department_id: inventory_old.department_id,
                    });
                    if (!update_inventory.success) {
                        throw new Error(update_inventory.message);
                    }
                } else {
                    throw new Error('inventory_old is undefined');
                }
            }
        } else {
            const create_inventory = await create({
                product: field.product,
                quantity: 0,
                department_id: field.department_id,
            });
            if (create_inventory?.success) {
                const update_inventory = await update_inventory_repo({
                    quantity: field.quantity,
                    product: field.product,
                    department_id: field.department_id,
                });
                if (!update_inventory?.success) {
                    throw new Error(update_inventory?.message);
                }
            } else {
                throw new Error(create_inventory?.message);
            }
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
