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
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_all_canteen = exports.find_canteen = exports.create = void 0;
const canteen_repository_1 = require("../repositorys/canteen.repository");
const canteen_validate_1 = require("../validates/canteen.validate");
const validates_1 = require("../validates");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, canteen_validate_1.validate_create_canteen)(data);
        if (!valid.error) {
            const new_canteen = yield (0, canteen_repository_1.create_canteen)(Object.assign({}, data));
            if (new_canteen === null || new_canteen === void 0 ? void 0 : new_canteen.success) {
                return {
                    success: true,
                    data: new_canteen === null || new_canteen === void 0 ? void 0 : new_canteen.data,
                };
            }
            else {
                return {
                    success: false,
                    message: new_canteen === null || new_canteen === void 0 ? void 0 : new_canteen.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create = create;
const find_canteen = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, validates_1.validation_id)(id);
        if (!valid.error) {
            const canteen = yield (0, canteen_repository_1.find_canteen_by_id)(id);
            if (canteen === null || canteen === void 0 ? void 0 : canteen.success) {
                return {
                    success: true,
                    data: canteen === null || canteen === void 0 ? void 0 : canteen.data,
                };
            }
            else {
                return {
                    success: false,
                    message: canteen === null || canteen === void 0 ? void 0 : canteen.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_canteen = find_canteen;
const find_all_canteen = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canteens = yield (0, canteen_repository_1.get_all_canteen)();
        if (canteens === null || canteens === void 0 ? void 0 : canteens.success) {
            return {
                success: true,
                data: canteens === null || canteens === void 0 ? void 0 : canteens.data,
            };
        }
        else {
            return {
                success: false,
                message: canteens === null || canteens === void 0 ? void 0 : canteens.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.massage,
        };
    }
});
exports.find_all_canteen = find_all_canteen;
