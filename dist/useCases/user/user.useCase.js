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
exports.get_all_users_of_position_for_admin_use = exports.getUserByIdUseCase = exports.getAllUserForOtRequestFeatureUse = exports.getUserForLeaveFeatureUse = exports.userFindAllWithFieldUse = exports.findAllUser = exports.findUserByName = exports.findUserById = exports.deleteUser = exports.updateUser = exports.createNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validates_1 = require("../../validates");
const enum_1 = require("../../enum");
const controllers_1 = require("../../controllers");
const utils_1 = require("../../utils");
const repositorys_1 = require("../../repositorys");
const userRepository = new repositorys_1.UserRepository();
const getAllUserForOtRequestFeatureUse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(id);
        if (valid_id === null || valid_id === void 0 ? void 0 : valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const users = yield userRepository.GET_ALL_USER_FOR_OT_REQUEST_FEATURE(id);
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            throw new Error(`${users === null || users === void 0 ? void 0 : users.message}`);
        }
        return {
            success: users === null || users === void 0 ? void 0 : users.success,
            data: users === null || users === void 0 ? void 0 : users.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `useCase :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.getAllUserForOtRequestFeatureUse = getAllUserForOtRequestFeatureUse;
const getUserForLeaveFeatureUse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(id);
        if (valid_id === null || valid_id === void 0 ? void 0 : valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const listUser = yield userRepository.getUserForLeaveFeatureRepo(id);
        if (!(listUser === null || listUser === void 0 ? void 0 : listUser.success)) {
            throw new Error(`${listUser === null || listUser === void 0 ? void 0 : listUser.message}`);
        }
        return {
            success: listUser === null || listUser === void 0 ? void 0 : listUser.success,
            data: listUser === null || listUser === void 0 ? void 0 : listUser.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.getUserForLeaveFeatureUse = getUserForLeaveFeatureUse;
const get_all_users_of_position_for_admin_use = (position) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof position !== 'string' ||
            !Object.values(enum_1.Position).includes(position)) {
            throw new Error('User position not available');
        }
        const users = yield userRepository.GET_ALL_USERS_OF_POSITION_FOR_ADMIN(position);
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            throw new Error(`${users === null || users === void 0 ? void 0 : users.message}`);
        }
        return {
            success: true,
            data: users === null || users === void 0 ? void 0 : users.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `useCase :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.get_all_users_of_position_for_admin_use = get_all_users_of_position_for_admin_use;
const userFindAllWithFieldUse = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.valid_user_find_all_with_field)(field);
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const users = yield userRepository.userFindAllWithFieldRepo(field);
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            throw new Error(`${users === null || users === void 0 ? void 0 : users.message}`);
        }
        return {
            success: true,
            data: users.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.userFindAllWithFieldUse = userFindAllWithFieldUse;
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.valid_user_create)(user);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (typeof user.role !== 'string' ||
            !Object.values(enum_1.Role).includes(user.role)) {
            throw new Error('User create failed -- Role not available');
        }
        if (typeof user.position !== 'string' ||
            !Object.values(enum_1.Position).includes(user.position)) {
            throw new Error('User create failed -- Position not available');
        }
        const department = yield (0, controllers_1.getDepartmentById)(user.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(`${department === null || department === void 0 ? void 0 : department.message}`);
        }
        const passBcrypt = yield bcrypt_1.default.hash(user.password, 10);
        const userBcrypted = Object.assign(Object.assign({}, user), { password: passBcrypt });
        const new_user = yield userRepository.userCreate(userBcrypted);
        if (!(new_user === null || new_user === void 0 ? void 0 : new_user.success)) {
            throw new Error(`${new_user === null || new_user === void 0 ? void 0 : new_user.message}`);
        }
        yield (0, utils_1.delCache)('ALL_USER');
        return {
            success: true,
            data: new_user === null || new_user === void 0 ? void 0 : new_user.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.createNewUser = createNewUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(user);
        const valid = (0, validates_1.valid_user_update)(user);
        console.log((_a = valid.error) === null || _a === void 0 ? void 0 : _a.message);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (user.password) {
            const passBcrypt = yield bcrypt_1.default.hash(user.password, 10);
            const userBcrypted = Object.assign(Object.assign({}, user), { password: passBcrypt });
            const new_user = yield userRepository.userUpdate(userBcrypted);
            if (!(new_user === null || new_user === void 0 ? void 0 : new_user.success)) {
                throw new Error(`${new_user === null || new_user === void 0 ? void 0 : new_user.message}`);
            }
            return {
                success: true,
            };
        }
        else {
            const user_updated = Object.assign({}, user);
            const new_user = yield userRepository.userUpdate(user_updated);
            if (!(new_user === null || new_user === void 0 ? void 0 : new_user.success)) {
                throw new Error(`${new_user === null || new_user === void 0 ? void 0 : new_user.message}`);
            }
            return {
                success: true,
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
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(id);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const user = yield userRepository.userFindById(id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const deleted_user = yield userRepository.userDelete(id);
        if (!(deleted_user === null || deleted_user === void 0 ? void 0 : deleted_user.success)) {
            throw new Error(`${deleted_user === null || deleted_user === void 0 ? void 0 : deleted_user.message}`);
        }
        return {
            success: true,
            message: deleted_user === null || deleted_user === void 0 ? void 0 : deleted_user.message,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.deleteUser = deleteUser;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(userId);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const user = yield userRepository.userFindById(userId);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        return {
            success: true,
            data: user === null || user === void 0 ? void 0 : user.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.findUserById = findUserById;
const findUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.valid_find_by_name)(name);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const user = yield userRepository.userFindByName(name);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        return {
            success: true,
            data: user === null || user === void 0 ? void 0 : user.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.findUserByName = findUserByName;
const findAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const VALUE_CACHE = yield (0, utils_1.getCache)('ALL_USER');
        if (VALUE_CACHE) {
            return {
                success: true,
                data: JSON.parse(VALUE_CACHE),
            };
        }
        const users = yield userRepository.userFindAll();
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            throw new Error(`${users === null || users === void 0 ? void 0 : users.message}`);
        }
        yield (0, utils_1.setCache)('ALL_USER', JSON.stringify(users.data), 1);
        return {
            success: true,
            data: users.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.findAllUser = findAllUser;
const getUserByIdUseCase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(id);
        if (valid_id.error) {
            throw new Error(`${valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message}`);
        }
        const user = yield userRepository.GET_USER_BY_ID(id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        return {
            success: true,
            data: user === null || user === void 0 ? void 0 : user.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.getUserByIdUseCase = getUserByIdUseCase;
