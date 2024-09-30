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
exports.getUserForLeaveFeatureUse = exports.userFindAllWithFieldUse = exports.findAllUser = exports.findUserByName = exports.findUserById = exports.deleteUser = exports.updateUser = exports.createNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validate_1 = require("../../validates/user/user.validate");
const validates_1 = require("../../validates");
const Role_enum_1 = require("../../enum/Role.enum");
const Position_enum_1 = require("../../enum/Position.enum");
const department_controller_1 = require("../../controllers/department/department.controller");
const repositorys_1 = require("../../repositorys");
const userRepository = new repositorys_1.UserRepository();
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
const userFindAllWithFieldUse = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, user_validate_1.valid_user_find_all_with_field)(field);
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
        const valid = (0, user_validate_1.valid_user_create)(user);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (typeof user.role === 'string' &&
            !Object.values(Role_enum_1.Role).includes(user.role) &&
            typeof user.position === 'string' &&
            !Object.values(Position_enum_1.Position).includes(user.position)) {
            throw new Error('User create failed Role or Position not available');
        }
        const department = yield (0, department_controller_1.getDepartmentById)(user.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(`${department === null || department === void 0 ? void 0 : department.message}`);
        }
        const passBcrypt = yield bcrypt_1.default.hash(user.password, 10);
        const userBcrypted = Object.assign(Object.assign({}, user), { password: passBcrypt });
        const new_user = yield userRepository.userCreate(userBcrypted);
        if (!(new_user === null || new_user === void 0 ? void 0 : new_user.success)) {
            throw new Error(`${new_user === null || new_user === void 0 ? void 0 : new_user.message}`);
        }
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
    try {
        const valid = (0, user_validate_1.valid_user_update)(user);
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
        const isValid = (0, user_validate_1.valid_find_by_name)(name);
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
        const users = yield userRepository.userFindAll();
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
exports.findAllUser = findAllUser;
