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
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
class UserRepository {
    userCreate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_user = yield models_1.User.create(Object.assign({}, user));
                if (new_user === null) {
                    throw new Error(`create new user error`);
                }
                return {
                    success: true,
                    data: new_user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    userUpdate(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateFields = Object.assign({}, field);
                const new_user_updated = yield models_1.User.update(updateFields, {
                    where: {
                        id: updateFields.id,
                    },
                });
                if (new_user_updated.toString() !== '1') {
                    throw new Error(`update user error`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    userDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBeforeDelete = yield models_1.User.update({
                    is_active: false,
                }, {
                    where: {
                        id: id,
                    },
                });
                if (userBeforeDelete.toString() !== '1') {
                    throw new Error(`delete user error because cannot update active to false`);
                }
                const userDel = yield models_1.User.destroy({
                    where: {
                        id: id,
                    },
                });
                if (userDel !== 1) {
                    throw new Error(`delete user error repo`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    getUserForLeaveFeatureRepo(department_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listUser = yield models_1.User.findAll({
                    where: {
                        department_id: department_id,
                        role: {
                            [sequelize_1.Op.ne]: 'STAFF',
                        },
                    },
                    attributes: ['id', 'name'],
                });
                if (listUser === null) {
                    throw new Error(`user not found`);
                }
                return {
                    success: true,
                    data: listUser,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    userFindById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByPk(id, {
                    attributes: [
                        'id',
                        'name',
                        'user_name',
                        'email',
                        'dob',
                        'phone',
                        'role',
                        'employee_id',
                        'department_id',
                        'is_active',
                        'position',
                        'is_admin',
                        'avatar',
                        'is_officer',
                    ],
                });
                if (user === null) {
                    throw new Error(`user not found`);
                }
                return {
                    success: true,
                    data: user,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    userFindByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `%${name}%`,
                        },
                    },
                    attributes: [
                        'id',
                        'name',
                        'user_name',
                        'email',
                        'dob',
                        'phone',
                        'employee_id',
                        'department_id',
                        'is_active',
                        'position',
                        'is_admin',
                        'is_officer',
                    ],
                });
                if (users === null || models_1.User.length < 1) {
                    throw new Error(`user not found`);
                }
                return {
                    success: true,
                    data: users,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    userFindAllWithFieldRepo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll({
                    where: Object.assign({}, field),
                    attributes: [
                        'id',
                        'name',
                        'user_name',
                        'role',
                        'email',
                        'dob',
                        'phone',
                        'employee_id',
                        'is_active',
                        'position',
                        'is_admin',
                        'is_officer',
                        'avatar',
                    ],
                    include: [
                        {
                            model: models_1.Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                });
                if (users === null) {
                    throw new Error(`user not found`);
                }
                return {
                    success: true,
                    data: users,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    userFindAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll({
                    attributes: [
                        'id',
                        'name',
                        'user_name',
                        'role',
                        'email',
                        'dob',
                        'phone',
                        'employee_id',
                        'is_active',
                        'position',
                        'is_admin',
                        'is_officer',
                    ],
                    include: [
                        {
                            model: models_1.Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                });
                if (users === null || users.length < 1) {
                    throw new Error(`user not found`);
                }
                return {
                    success: true,
                    data: users,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
}
exports.default = UserRepository;
