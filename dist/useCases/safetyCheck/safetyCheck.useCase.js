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
exports.search_safety_checked_use = exports.create_safety_check_use = void 0;
const repositorys_1 = require("../../repositorys");
const safetyCheck_validate_1 = require("../../validates/safetyCheck/safetyCheck.validate");
const events_useCase_1 = require("../events/events.useCase");
const safetyCheckRepository = new repositorys_1.SafetyCheckRepository();
const create_safety_check_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, safetyCheck_validate_1.validate_create_safety_check)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message);
        }
        const event = yield (0, events_useCase_1.search_event_by_id_use)(field.event_id);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            throw new Error(event === null || event === void 0 ? void 0 : event.message);
        }
        const safety_check = yield safetyCheckRepository.create_safety_check_repo(field);
        if (!(safety_check === null || safety_check === void 0 ? void 0 : safety_check.success)) {
            throw new Error(safety_check === null || safety_check === void 0 ? void 0 : safety_check.message);
        }
        return {
            success: true,
            data: safety_check === null || safety_check === void 0 ? void 0 : safety_check.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_safety_check_use = create_safety_check_use;
const search_safety_checked_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, safetyCheck_validate_1.validate_search_safety_checked)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_b = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _b === void 0 ? void 0 : _b.message);
        }
        const event_check = yield safetyCheckRepository.search_safety_checked_repo(field);
        if (!(event_check === null || event_check === void 0 ? void 0 : event_check.success)) {
            throw new Error(event_check === null || event_check === void 0 ? void 0 : event_check.message);
        }
        return {
            success: true,
            data: event_check === null || event_check === void 0 ? void 0 : event_check.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_safety_checked_use = search_safety_checked_use;
