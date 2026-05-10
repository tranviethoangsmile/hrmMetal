import { create_daily_report, search_report } from '../../interfaces';
import {
    valid_create_daily_report,
    valid_search_daily_report,
} from '../../validates';
import { validation_id } from '../../validates';
import { Products, shift, CodeError } from '../../enum';
import {
    InventoryRepository,
    DailyReportRepository,
    DepartmentRepository,
    CodeErrorsRepository,
} from '../../repositorys';
import db from '../../dbs/db';
import { create_notification_usecase, findUserById } from '../index';
import { isValidEnumValue } from '../../helpers';
const inventoryRepository = new InventoryRepository();
const dailyReportRepository = new DailyReportRepository();
const departmentRepository = new DepartmentRepository();
const codeErrorsRepository = new CodeErrorsRepository();
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
        case 'D86_CTC':
            return 'D86CTC';
        case 'D67E_CTC':
            return 'D67ECTC';
        case 'D61F_PAO_DC4':
        case 'D61F_PAO_DC2':
            return 'D61F';
        case 'D66_5':
        case 'D66_6':
        case 'D66_7':
        case 'D66_DC3':
            return 'D66F';
        case 'D59P':
            return 'D59P';
        case 'DF93_4':
        case 'DF93_3':
            return 'DF93CTC';
        case 'DK05FR_1':
        case 'DK05FR_2':
            return 'DK05FR';
        case 'DK05RR_2':
        case 'DK05RR_1':
            return 'DK05RR';
        case 'C84_BUV':
            return 'C84';
        default:
            return value;
    }
};
const create_daily_report_use = async (field: create_daily_report) => {
    const t = await db.transaction();
    try {
        const isValid = valid_create_daily_report(field);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const normalizedField: create_daily_report = isValid.value;
        const user = await findUserById(normalizedField.user_id);
        if (!user?.success) {
            throw new Error(user?.message || 'User not found');
        }
        if (!isValidEnumValue(normalizedField.product, Products)) {
            throw new Error(`${normalizedField.product} not valid`);
        }
        if (!isValidEnumValue(normalizedField.shift, shift)) {
            throw new Error('Shift name not valid');
        }

        const department = await departmentRepository.getDepartmentById(
            normalizedField.department_id,
        );
        if (!department?.success) {
            throw new Error(department?.message || 'Department not found');
        }

        const report = await dailyReportRepository.daily_report_create({
            ...normalizedField,
        }, t);
        if (!report?.success) {
            throw new Error(report?.message || 'Failed to create daily report');
        }
        if (!report?.data?.id) {
            throw new Error('Failed to get daily report id');
        }

        const errors = normalizedField.errors || [];
        if (errors.length > 0) {
            const codeErrorPayload = errors.map(err => ({
                code: err.code,
                description: err.description,
                shutdown_time: err.shutdown_time,
                error_date: err.error_date,
                daily_report_id: report.data.id,
            }));

            codeErrorPayload.forEach(e => {
                if(!isValidEnumValue(e.code, CodeError)){
                    throw new Error(`${e.code} not valid`)
                }
            });

            const createCodeErrorsResult =
                await codeErrorsRepository.CREATE(codeErrorPayload, t);
            if (!createCodeErrorsResult?.success) {
                throw new Error(
                    createCodeErrorsResult?.message ||
                        'Failed to create code errors',
                );
            }
        }
        const field_search = {
            product: handleProductName(normalizedField.product),
        };
        const inventorys = await inventoryRepository.search_inventory_with_name(
            {
                ...field_search,
            },
        );
        if (inventorys?.success) {
            if (user?.data?.department?.name === '加工') {
                const is_avaliable = inventorys?.data?.some(
                    inventory =>
                        inventory.department_id === normalizedField.department_id,
                );
                if (!is_avaliable) {
                    const inventory = inventorys?.data?.[0];
                    const create_inventory = await inventoryRepository.create({
                        product: handleProductName(normalizedField.product),
                        quantity: normalizedField.quantity,
                        department_id: normalizedField.department_id,
                    });
                    if (!create_inventory?.success) {
                        throw new Error('Failed to get inventory quantity');
                    }
                    if (inventory?.quantity != undefined) {
                        const update_inventory_old =
                            await inventoryRepository.update_inventory_repo({
                                quantity:
                                    inventory.quantity - normalizedField.quantity,
                                product: handleProductName(normalizedField.product),
                                department_id: inventory.department_id,
                            });
                        if (!update_inventory_old?.success) {
                            throw new Error(update_inventory_old?.message);
                        }
                    } else {
                        throw new Error(create_inventory?.message);
                    }
                } else {
                    let inventory_old_of_kako: any;
                    let inventory_old: any;
                    inventorys?.data?.forEach(inventory => {
                        if (
                            inventory?.department_id !=
                            normalizedField.department_id
                        ) {
                            inventory_old = inventory;
                        } else {
                            inventory_old_of_kako = inventory;
                        }
                    });
                    if (
                        inventory_old_of_kako?.quantity != undefined &&
                        inventory_old?.quantity != undefined
                    ) {
                        const update_kako =
                            await inventoryRepository.update_inventory_repo({
                                quantity:
                                    inventory_old_of_kako.quantity +
                                    normalizedField.quantity,
                                product: inventory_old_of_kako.product,
                                department_id:
                                    inventory_old_of_kako.department_id,
                            });
                        if (!update_kako?.success) {
                            throw new Error(update_kako?.message);
                        }
                        const update_inventory =
                            await inventoryRepository.update_inventory_repo({
                                quantity:
                                    inventory_old.quantity -
                                    normalizedField.quantity,
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
                    if (
                        inventory?.department_id ===
                        normalizedField.department_id
                    ) {
                        inventory_old = inventory;
                    }
                });
                if (inventory_old?.quantity != undefined) {
                    const update_inventory =
                        await inventoryRepository.update_inventory_repo({
                            quantity:
                                inventory_old.quantity +
                                normalizedField.quantity,
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
            const create_inventory = await inventoryRepository.create({
                product: handleProductName(normalizedField.product),
                quantity: 0,
                department_id: normalizedField.department_id,
            });
            if (create_inventory?.success) {
                const update_inventory =
                    await inventoryRepository.update_inventory_repo({
                        quantity: normalizedField.quantity,
                        product: handleProductName(normalizedField.product),
                        department_id: normalizedField.department_id,
                    });
                if (!update_inventory?.success) {
                    throw new Error(update_inventory?.message);
                }
            } else {
                throw new Error(create_inventory?.message);
            }
        }
        await t.commit();
        try {
            const field_notification = {
                title: 'Inventory',
                user_id: report?.data?.user_id,
                type: 'SUCCESS',
                message: 'Inventory success',
            };
            const notification = await create_notification_usecase(
                field_notification,
            );
            if (!notification?.success) {
                throw new Error(notification?.message);
            }
        } catch (error: any) {
            console.log(`notification: ${error?.message}`);
        }
        return { success: true, data: report?.data };
    } catch (error: any) {
        await t.rollback();
        return { success: false, message: error?.message || 'Unknown error' };
    }
};

const search_daily_report = async (data: search_report) => {
    try {
        const valid = valid_search_daily_report(data);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const reports = await dailyReportRepository.find_report(data);
        if (!reports?.success) {
            throw new Error(`${reports?.message}`);
        }
        return {
            success: true,
            data: reports?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_report_use = async (field: search_report) => {
    try {
        const dailyReports =
            await dailyReportRepository.find_all_report_of_department({
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
        const valid = validation_id(id);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const report = await dailyReportRepository.find_daily_report_by_id(id);
        if (!report?.success) {
            throw new Error(`${report?.message}`);
        }
        return {
            success: true,
            data: report?.data,
        };
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
