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
exports.update_day_off_by_id_use = exports.get_day_off_by_id_use = exports.delete_day_off_by_id_use = exports.get_all_day_off_use = exports.create_day_off_use = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const dayOffsRepository = new repositorys_1.DayOffsRepository();
const create_day_off_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, validates_1.validate_create_day_off)(field);
        if (isValid.error) {
            throw new Error((_a = isValid.error) === null || _a === void 0 ? void 0 : _a.message);
        }
        const dayOff = yield dayOffsRepository.CREATE(field);
        if (!(dayOff === null || dayOff === void 0 ? void 0 : dayOff.success)) {
            throw new Error((dayOff === null || dayOff === void 0 ? void 0 : dayOff.message) || 'Unknown error occurred in repository');
        }
        return dayOff;
    }
    catch (error) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
});
exports.create_day_off_use = create_day_off_use;
const get_all_day_off_use = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayOffs = yield dayOffsRepository.GET_ALL();
        if (!(dayOffs === null || dayOffs === void 0 ? void 0 : dayOffs.success)) {
            throw new Error(dayOffs.message);
        }
        return dayOffs;
    }
    catch (error) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
});
exports.get_all_day_off_use = get_all_day_off_use;
const get_day_off_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid.error) {
            throw new Error((_b = isValid.error) === null || _b === void 0 ? void 0 : _b.message);
        }
        const dayOff = yield dayOffsRepository.GET_BY_ID(id);
        if (!(dayOff === null || dayOff === void 0 ? void 0 : dayOff.success)) {
            throw new Error(dayOff.message);
        }
        return dayOff;
    }
    catch (error) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
});
exports.get_day_off_by_id_use = get_day_off_by_id_use;
const delete_day_off_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid.error) {
            throw new Error((_c = isValid.error) === null || _c === void 0 ? void 0 : _c.message);
        }
        const dayOff = yield dayOffsRepository.DELETE(id);
        if (!(dayOff === null || dayOff === void 0 ? void 0 : dayOff.success)) {
            throw new Error(dayOff.message);
        }
        return dayOff;
    }
    catch (error) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
});
exports.delete_day_off_by_id_use = delete_day_off_by_id_use;
const update_day_off_by_id_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const isValid = (0, validates_1.validate_update_day_off)(field);
        if (isValid.error) {
            throw new Error((_d = isValid.error) === null || _d === void 0 ? void 0 : _d.message);
        }
        const dayOff = yield dayOffsRepository.GET_BY_ID(field.id);
        if (!(dayOff === null || dayOff === void 0 ? void 0 : dayOff.success)) {
            throw new Error(dayOff.message);
        }
        const result = yield dayOffsRepository.UPDATE(field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(dayOff.message);
        }
        return result;
    }
    catch (error) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
});
exports.update_day_off_by_id_use = update_day_off_by_id_use;
