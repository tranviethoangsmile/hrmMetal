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
exports.findAllUser = exports.findUserByName = exports.findUserById = exports.deleteUser = exports.updateUser = exports.createNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositorys/user.repository");
const user_validate_1 = require("../validates/user.validate");
const validates_1 = require("../validates");
const Role_enum_1 = require("../enum/Role.enum");
const Position_enum_1 = require("../enum/Position.enum");
const department_controller_1 = require("../controllers/department.controller");
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, user_validate_1.valid_user_create)(user);
        if (!valid.error) {
            if (typeof user.role === 'string' &&
                Object.values(Role_enum_1.Role).includes(user.role) &&
                typeof user.position === 'string' &&
                Object.values(Position_enum_1.Position).includes(user.position)) {
                const department = yield (0, department_controller_1.getDepartmentById)(user.department_id);
                if (department === null || department === void 0 ? void 0 : department.success) {
                    const passBcrypt = yield bcrypt_1.default.hash(user.password, 10);
                    const userBcrypted = Object.assign(Object.assign({}, user), { password: passBcrypt });
                    const new_user = yield (0, user_repository_1.userCreate)(userBcrypted);
                    if (new_user === null || new_user === void 0 ? void 0 : new_user.success) {
                        return {
                            success: true,
                            data: new_user === null || new_user === void 0 ? void 0 : new_user.data,
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: new_user === null || new_user === void 0 ? void 0 : new_user.message,
                        };
                    }
                }
                else {
                    return {
                        succsess: false,
                        message: department === null || department === void 0 ? void 0 : department.message,
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'User create failed Role or Position not available',
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
            message: error.message,
        };
    }
});
exports.createNewUser = createNewUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, user_validate_1.valid_user_update)(user);
        if (!valid.error) {
            if (user.password) {
                const passBcrypt = yield bcrypt_1.default.hash(user.password, 10);
                const userBcrypted = Object.assign(Object.assign({}, user), { password: passBcrypt });
                const new_user = yield (0, user_repository_1.userUpdate)(userBcrypted);
                if (new_user === null || new_user === void 0 ? void 0 : new_user.success) {
                    return {
                        success: true,
                        message: 'User updated',
                    };
                }
                else {
                    return {
                        success: false,
                        message: new_user === null || new_user === void 0 ? void 0 : new_user.message,
                    };
                }
            }
        }
        else {
            return {
                success: false,
                message: (_a = valid.error) === null || _a === void 0 ? void 0 : _a.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error,
        };
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(id);
        if (!valid_id.error) {
            const user = yield (0, user_repository_1.userFindById)(id);
            if (user) {
                const deleted_user = yield (0, user_repository_1.userDelete)(id);
                if ((deleted_user === null || deleted_user === void 0 ? void 0 : deleted_user.data) === 1) {
                    return {
                        success: true,
                        message: 'User deleted',
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'User delete faild',
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'user not exist',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'id wrong...!!',
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
exports.deleteUser = deleteUser;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid_id = (0, validates_1.validation_id)(userId);
        if (!valid_id.error) {
            const user = yield (0, user_repository_1.userFindById)(userId);
            if (user === null || user === void 0 ? void 0 : user.success) {
                return {
                    success: true,
                    data: user === null || user === void 0 ? void 0 : user.data,
                };
            }
            else {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
        }
        else {
            return {
                success: false,
                message: valid_id === null || valid_id === void 0 ? void 0 : valid_id.error.message,
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
exports.findUserById = findUserById;
const findUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (name !== '') {
            const user = yield (0, user_repository_1.userFindByName)(name);
            if (user) {
                return {
                    success: true,
                    data: user,
                };
            }
            else {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
        }
        else {
            return {
                success: true,
                message: 'name not empty',
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
exports.findUserByName = findUserByName;
const findAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_repository_1.userFindAll)();
        if (users === null || users === void 0 ? void 0 : users.success) {
            return {
                success: true,
                data: users.data,
            };
        }
        else {
            return {
                success: false,
                message: users === null || users === void 0 ? void 0 : users.message,
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
exports.findAllUser = findAllUser;
