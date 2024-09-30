"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_rp_by_id = exports.search_daily_report = exports.find_all_report_use = exports.create_daily_report_use = void 0;
const dailyReport_validate_1 = require("../../validates/dailyReport/dailyReport.validate");
const validates_1 = require("../../validates");
const product_enum_1 = require("../../enum/product.enum");
const user_useCase_1 = require("../user/user.useCase");
const shift_enum_1 = require("../../enum/shift.enum");
const repositorys_1 = require("../../repositorys");
const db_1 = __importDefault(require("../../dbs/db"));
const notification_usecase_1 = require("../notification/notification.usecase");
const inventoryRepository = new repositorys_1.InventoryRepository();
const dailyReportRepository = new repositorys_1.DailyReportRepository();
const departmentRepository = new repositorys_1.DepartmentRepository();
const handleProductName = (value) => {
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
        case 'C84_BUV':
            return 'C84';
        default:
            return value;
    }
};
const create_daily_report_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const t = yield db_1.default.transaction();
    try {
        const isValid = (0, dailyReport_validate_1.valid_create_daily_report)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const user = yield (0, user_useCase_1.findUserById)(field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error((user === null || user === void 0 ? void 0 : user.message) || 'User not found');
        }
        if (!Object.values(product_enum_1.Products).includes(field.product)) {
            throw new Error(`${field.product} not valid`);
        }
        if (!Object.values(shift_enum_1.shift).includes(field.shift)) {
            throw new Error('Shift name not valid');
        }
        const department = yield departmentRepository.getDepartmentById(field.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error((department === null || department === void 0 ? void 0 : department.message) || 'Department not found');
        }
        const report = yield dailyReportRepository.daily_report_create(Object.assign({}, field));
        if (!(report === null || report === void 0 ? void 0 : report.success)) {
            throw new Error((report === null || report === void 0 ? void 0 : report.message) || 'Failed to create daily report');
        }
        const field_search = {
            product: handleProductName(field.product),
        };
        const inventorys = yield inventoryRepository.search_inventory_with_name(Object.assign({}, field_search));
        if (inventorys === null || inventorys === void 0 ? void 0 : inventorys.success) {
            if (((_b = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.department) === null || _b === void 0 ? void 0 : _b.name) === '加工') {
                const is_avaliable = (_c = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _c === void 0 ? void 0 : _c.some(inventory => inventory.department_id === field.department_id);
                if (!is_avaliable) {
                    const inventory = (_d = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _d === void 0 ? void 0 : _d[0];
                    const create_inventory = yield inventoryRepository.create({
                        product: handleProductName(field.product),
                        quantity: field.quantity,
                        department_id: field.department_id,
                    });
                    if (!(create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.success)) {
                        throw new Error('Failed to get inventory quantity');
                    }
                    if ((inventory === null || inventory === void 0 ? void 0 : inventory.quantity) != undefined) {
                        const update_inventory_old = yield inventoryRepository.update_inventory_repo({
                            quantity: inventory.quantity - field.quantity,
                            product: handleProductName(field.product),
                            department_id: inventory.department_id,
                        });
                        if (!(update_inventory_old === null || update_inventory_old === void 0 ? void 0 : update_inventory_old.success)) {
                            throw new Error(update_inventory_old === null || update_inventory_old === void 0 ? void 0 : update_inventory_old.message);
                        }
                    }
                    else {
                        throw new Error(create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.message);
                    }
                }
                else {
                    let inventory_old_of_kako;
                    let inventory_old;
                    (_e = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _e === void 0 ? void 0 : _e.forEach(inventory => {
                        if ((inventory === null || inventory === void 0 ? void 0 : inventory.department_id) != field.department_id) {
                            inventory_old = inventory;
                        }
                        else {
                            inventory_old_of_kako = inventory;
                        }
                    });
                    if ((inventory_old_of_kako === null || inventory_old_of_kako === void 0 ? void 0 : inventory_old_of_kako.quantity) != undefined &&
                        (inventory_old === null || inventory_old === void 0 ? void 0 : inventory_old.quantity) != undefined) {
                        const update_kako = yield inventoryRepository.update_inventory_repo({
                            quantity: inventory_old_of_kako.quantity +
                                field.quantity,
                            product: inventory_old_of_kako.product,
                            department_id: inventory_old_of_kako.department_id,
                        });
                        if (!(update_kako === null || update_kako === void 0 ? void 0 : update_kako.success)) {
                            throw new Error(update_kako === null || update_kako === void 0 ? void 0 : update_kako.message);
                        }
                        const update_inventory = yield inventoryRepository.update_inventory_repo({
                            quantity: inventory_old.quantity - field.quantity,
                            product: inventory_old.product,
                            department_id: inventory_old.department_id,
                        });
                        if (!update_inventory.success) {
                            throw new Error(update_inventory.message);
                        }
                    }
                    else {
                        throw new Error('inventory_old_of_kako or inventory_old is undefined');
                    }
                }
            }
            else {
                let inventory_old;
                (_f = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _f === void 0 ? void 0 : _f.forEach(inventory => {
                    if ((inventory === null || inventory === void 0 ? void 0 : inventory.department_id) === field.department_id) {
                        inventory_old = inventory;
                    }
                });
                if ((inventory_old === null || inventory_old === void 0 ? void 0 : inventory_old.quantity) != undefined) {
                    const update_inventory = yield inventoryRepository.update_inventory_repo({
                        quantity: inventory_old.quantity + field.quantity,
                        product: inventory_old.product,
                        department_id: inventory_old.department_id,
                    });
                    if (!update_inventory.success) {
                        throw new Error(update_inventory.message);
                    }
                }
                else {
                    throw new Error('inventory_old is undefined');
                }
            }
        }
        else {
            const create_inventory = yield inventoryRepository.create({
                product: handleProductName(field.product),
                quantity: 0,
                department_id: field.department_id,
            });
            if (create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.success) {
                const update_inventory = yield inventoryRepository.update_inventory_repo({
                    quantity: field.quantity,
                    product: handleProductName(field.product),
                    department_id: field.department_id,
                });
                if (!(update_inventory === null || update_inventory === void 0 ? void 0 : update_inventory.success)) {
                    throw new Error(update_inventory === null || update_inventory === void 0 ? void 0 : update_inventory.message);
                }
            }
            else {
                throw new Error(create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.message);
            }
        }
        yield t.commit();
        try {
            const field_notification = {
                title: 'Inventory',
                user_id: (_g = report === null || report === void 0 ? void 0 : report.data) === null || _g === void 0 ? void 0 : _g.user_id,
                type: 'SUCCESS',
                message: 'Inventory success',
            };
            const notification = yield (0, notification_usecase_1.create_notification_usecase)(field_notification);
            if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
            }
        }
        catch (error) {
            console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
        }
        return { success: true, data: report === null || report === void 0 ? void 0 : report.data };
    }
    catch (error) {
        yield t.rollback();
        return { success: false, message: (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error' };
    }
});
exports.create_daily_report_use = create_daily_report_use;
const search_daily_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, dailyReport_validate_1.valid_search_daily_report)(data);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const reports = yield dailyReportRepository.find_report(data);
        if (!(reports === null || reports === void 0 ? void 0 : reports.success)) {
            throw new Error(`${reports === null || reports === void 0 ? void 0 : reports.message}`);
        }
        return {
            success: true,
            data: reports === null || reports === void 0 ? void 0 : reports.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_daily_report = search_daily_report;
const find_all_report_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dailyReports = yield dailyReportRepository.find_all_report_of_department(Object.assign({}, field));
        if (!(dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.success)) {
            throw new Error(dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.message);
        }
        return {
            success: true,
            data: dailyReports === null || dailyReports === void 0 ? void 0 : dailyReports.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.find_all_report_use = find_all_report_use;
const find_rp_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validation_id)(id);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const report = yield dailyReportRepository.find_daily_report_by_id(id);
        if (!(report === null || report === void 0 ? void 0 : report.success)) {
            throw new Error(`${report === null || report === void 0 ? void 0 : report.message}`);
        }
        return {
            success: true,
            data: report === null || report === void 0 ? void 0 : report.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_rp_by_id = find_rp_by_id;
