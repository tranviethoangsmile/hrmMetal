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
exports.userFindAll = exports.userFindByName = exports.userFindById = exports.userDelete = exports.userUpdate = exports.userCreate = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const userCreate = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_user = yield models_1.User.create(Object.assign({}, user));
        if (new_user != null) {
            return {
                success: true,
                data: new_user,
            };
        }
        else {
            return {
                success: false,
                message: 'create user error',
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
exports.userCreate = userCreate;
const userUpdate = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateFields = Object.assign({}, user);
        const new_user_updated = yield models_1.User.update(updateFields, {
            where: {
                id: updateFields.id,
            },
        });
        if (new_user_updated.toString() === '1') {
            return {
                success: true,
            };
        }
        else {
            return {
                success: false,
                message: 'update user error',
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
exports.userUpdate = userUpdate;
const userDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBeforeDelete = yield models_1.User.update({
            is_active: false,
        }, {
            where: {
                id: id,
            },
        });
        if (userBeforeDelete.toString() === '1') {
            const userDel = yield models_1.User.destroy({
                where: {
                    id: id,
                },
            });
            if (userDel === 1) {
                return {
                    success: true,
                    data: userDel,
                };
            }
            else {
                return {
                    success: false,
                    message: 'delete user error repo',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'delete user error',
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
exports.userDelete = userDelete;
const userFindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(id, {
            attributes: [
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
            ],
            include: [
                {
                    model: models_1.Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (user != null) {
            return {
                success: true,
                data: user,
            };
        }
        else {
            return {
                success: false,
                message: 'not found user',
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
exports.userFindById = userFindById;
const userFindByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${name}%`,
                },
            },
            attributes: [
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
            ],
        });
        if (user != null) {
            return {
                success: true,
                data: user,
            };
        }
        else {
            return {
                success: false,
                message: 'not found user',
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
exports.userFindByName = userFindByName;
const userFindAll = () => __awaiter(void 0, void 0, void 0, function* () {
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
            ],
            include: [
                {
                    model: models_1.Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (users != null) {
            return {
                success: true,
                data: users,
            };
        }
        else {
            return {
                success: false,
                message: 'not found user',
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
exports.userFindAll = userFindAll;
