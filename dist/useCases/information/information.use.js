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
exports.delete_information_by_id_use = exports.search_all_information_with_field_use = exports.search_information_by_id_use = exports.search_information_of_user_use = exports.create_information_use = void 0;
const validates_1 = require("../../validates");
const enum_1 = require("../../enum");
const validates_2 = require("../../validates");
const user_useCase_1 = require("../user/user.useCase");
const repositorys_1 = require("../../repositorys");
const informationRepository = new repositorys_1.InformationRepository();
const create_information_use = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, validates_1.validate_create_information)(value);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const user_created = yield (0, user_useCase_1.findUserById)(value.user_id);
        if (!(user_created === null || user_created === void 0 ? void 0 : user_created.success)) {
            throw new Error(`${user_created === null || user_created === void 0 ? void 0 : user_created.message}`);
        }
        const position = (_a = user_created === null || user_created === void 0 ? void 0 : user_created.data) === null || _a === void 0 ? void 0 : _a.position;
        const info_value = Object.assign(Object.assign({}, value), { position: position });
        if (!info_value ||
            !info_value.content ||
            !info_value.date ||
            !info_value.position ||
            !info_value.title ||
            !info_value.user_id) {
            const missingFields = [
                !info_value.content && 'content',
                !info_value.date && 'date',
                !info_value.position && 'position',
                !info_value.title && 'title',
                !info_value.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            throw new Error(`Missing required fields: ${missingFields}`);
        }
        if (typeof info_value.position === 'string' &&
            !Object.values(enum_1.Position).includes(info_value.position)) {
            throw new Error('position is not valid');
        }
        const newInfomation = yield informationRepository.create_information_repo(info_value);
        if (!(newInfomation === null || newInfomation === void 0 ? void 0 : newInfomation.success)) {
            throw new Error(`${newInfomation === null || newInfomation === void 0 ? void 0 : newInfomation.message}`);
        }
        return {
            success: true,
            data: newInfomation === null || newInfomation === void 0 ? void 0 : newInfomation.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
});
exports.create_information_use = create_information_use;
const search_information_of_user_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_2.validation_id)(id);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const informations = yield informationRepository.search_information_of_user_repo(id);
        if (!(informations === null || informations === void 0 ? void 0 : informations.success)) {
            throw new Error(`${informations === null || informations === void 0 ? void 0 : informations.message}`);
        }
        return {
            success: informations.success,
            data: informations.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
});
exports.search_information_of_user_use = search_information_of_user_use;
const search_information_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_2.validation_id)(id);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const information = yield informationRepository.search_information_by_id_repo(id);
        if (!(information === null || information === void 0 ? void 0 : information.success)) {
            throw new Error(`${information === null || information === void 0 ? void 0 : information.message}`);
        }
        return {
            success: information.success,
            data: information.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
});
exports.search_information_by_id_use = search_information_by_id_use;
const search_all_information_with_field_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validate_search_all_information)(field);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const informations = yield informationRepository.search_information_all_with_field_repo(field);
        if (!(informations === null || informations === void 0 ? void 0 : informations.success)) {
            throw new Error(`${informations === null || informations === void 0 ? void 0 : informations.message}`);
        }
        return {
            success: true,
            data: informations === null || informations === void 0 ? void 0 : informations.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
});
exports.search_all_information_with_field_use = search_all_information_with_field_use;
const delete_information_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_2.validation_id)(id);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const information = yield informationRepository.search_information_by_id_repo(id);
        if (!(information === null || information === void 0 ? void 0 : information.success)) {
            throw new Error(`${information === null || information === void 0 ? void 0 : information.message}`);
        }
        const result_delete = yield informationRepository.delete_information_by_id_repo(id);
        if (!(result_delete === null || result_delete === void 0 ? void 0 : result_delete.success)) {
            throw new Error(`${result_delete === null || result_delete === void 0 ? void 0 : result_delete.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
});
exports.delete_information_by_id_use = delete_information_by_id_use;
