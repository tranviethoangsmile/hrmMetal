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
const validates_1 = require("../../validates");
const validates_2 = require("../../validates");
const enum_1 = require("../../enum");
const repositorys_1 = require("../../repositorys");
const db_1 = __importDefault(require("../../dbs/db"));
const index_1 = require("../index");
const helpers_1 = require("../../helpers");
const inventoryRepository = new repositorys_1.InventoryRepository();
const dailyReportRepository = new repositorys_1.DailyReportRepository();
const departmentRepository = new repositorys_1.DepartmentRepository();
const codeErrorsRepository = new repositorys_1.CodeErrorsRepository();
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
const create_daily_report_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const t = yield db_1.default.transaction();
    try {
        const isValid = (0, validates_1.valid_create_daily_report)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const normalizedField = isValid.value;
        const user = yield (0, index_1.findUserById)(normalizedField.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error((user === null || user === void 0 ? void 0 : user.message) || 'User not found');
        }
        if (!(0, helpers_1.isValidEnumValue)(normalizedField.product, enum_1.Products)) {
            throw new Error(`${normalizedField.product} not valid`);
        }
        if (!(0, helpers_1.isValidEnumValue)(normalizedField.shift, enum_1.shift)) {
            throw new Error('Shift name not valid');
        }
        const department = yield departmentRepository.getDepartmentById(normalizedField.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error((department === null || department === void 0 ? void 0 : department.message) || 'Department not found');
        }
        const report = yield dailyReportRepository.daily_report_create(normalizedField, t);
        if (!(report === null || report === void 0 ? void 0 : report.success)) {
            throw new Error((report === null || report === void 0 ? void 0 : report.message) || 'Failed to create daily report');
        }
        if (!((_a = report === null || report === void 0 ? void 0 : report.data) === null || _a === void 0 ? void 0 : _a.id)) {
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
                if (!(0, helpers_1.isValidEnumValue)(e.code, enum_1.CodeError)) {
                    throw new Error(`${e.code} not valid`);
                }
            });
            const createCodeErrorsResult = yield codeErrorsRepository.CREATE(codeErrorPayload, t);
            if (!(createCodeErrorsResult === null || createCodeErrorsResult === void 0 ? void 0 : createCodeErrorsResult.success)) {
                throw new Error((createCodeErrorsResult === null || createCodeErrorsResult === void 0 ? void 0 : createCodeErrorsResult.message) ||
                    'Failed to create code errors');
            }
        }
        const field_search = {
            product: handleProductName(normalizedField.product),
        };
        const inventorys = yield inventoryRepository.search_inventory_with_name(Object.assign({}, field_search));
        if (inventorys === null || inventorys === void 0 ? void 0 : inventorys.success) {
            if (((_c = (_b = user === null || user === void 0 ? void 0 : user.data) === null || _b === void 0 ? void 0 : _b.department) === null || _c === void 0 ? void 0 : _c.name) === '加工') {
                const is_avaliable = (_d = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _d === void 0 ? void 0 : _d.some(inventory => inventory.department_id === normalizedField.department_id);
                if (!is_avaliable) {
                    const inventory = (_e = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _e === void 0 ? void 0 : _e[0];
                    const create_inventory = yield inventoryRepository.create({
                        product: handleProductName(normalizedField.product),
                        quantity: normalizedField.quantity,
                        department_id: normalizedField.department_id,
                    });
                    if (!(create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.success)) {
                        throw new Error('Failed to get inventory quantity');
                    }
                    if ((inventory === null || inventory === void 0 ? void 0 : inventory.quantity) != undefined) {
                        const update_inventory_old = yield inventoryRepository.update_inventory_repo({
                            quantity: inventory.quantity - normalizedField.quantity,
                            product: handleProductName(normalizedField.product),
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
                    (_f = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _f === void 0 ? void 0 : _f.forEach(inventory => {
                        if ((inventory === null || inventory === void 0 ? void 0 : inventory.department_id) !=
                            normalizedField.department_id) {
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
                                normalizedField.quantity,
                            product: inventory_old_of_kako.product,
                            department_id: inventory_old_of_kako.department_id,
                        });
                        if (!(update_kako === null || update_kako === void 0 ? void 0 : update_kako.success)) {
                            throw new Error(update_kako === null || update_kako === void 0 ? void 0 : update_kako.message);
                        }
                        const update_inventory = yield inventoryRepository.update_inventory_repo({
                            quantity: inventory_old.quantity -
                                normalizedField.quantity,
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
                (_g = inventorys === null || inventorys === void 0 ? void 0 : inventorys.data) === null || _g === void 0 ? void 0 : _g.forEach(inventory => {
                    if ((inventory === null || inventory === void 0 ? void 0 : inventory.department_id) ===
                        normalizedField.department_id) {
                        inventory_old = inventory;
                    }
                });
                if ((inventory_old === null || inventory_old === void 0 ? void 0 : inventory_old.quantity) != undefined) {
                    const update_inventory = yield inventoryRepository.update_inventory_repo({
                        quantity: inventory_old.quantity +
                            normalizedField.quantity,
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
                product: handleProductName(normalizedField.product),
                quantity: 0,
                department_id: normalizedField.department_id,
            });
            if (create_inventory === null || create_inventory === void 0 ? void 0 : create_inventory.success) {
                const update_inventory = yield inventoryRepository.update_inventory_repo({
                    quantity: normalizedField.quantity,
                    product: handleProductName(normalizedField.product),
                    department_id: normalizedField.department_id,
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
                user_id: (_h = report === null || report === void 0 ? void 0 : report.data) === null || _h === void 0 ? void 0 : _h.user_id,
                type: 'SUCCESS',
                message: 'Inventory success',
            };
            const notification = yield (0, index_1.create_notification_usecase)(field_notification);
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
        const valid = (0, validates_1.valid_search_daily_report)(data);
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
        const valid = (0, validates_2.validation_id)(id);
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
