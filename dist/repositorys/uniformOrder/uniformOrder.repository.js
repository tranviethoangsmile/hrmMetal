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
class UniformOrderRepository {
    create(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniformOrder = yield models_1.UniformOrder.create(Object.assign({}, field));
                if (uniformOrder === null) {
                    throw new Error(`create uniform order failed`);
                }
                return {
                    success: true,
                    data: uniformOrder,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    search_all_uniform_order_by_position(position) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniformOrders = yield models_1.UniformOrder.findAll({
                    where: {
                        position: position,
                    },
                });
                if (uniformOrders.length < 1) {
                    throw new Error(`uniform order not found`);
                }
                return {
                    success: true,
                    data: uniformOrders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    search_all_uniform_order_by_user_id(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniformOrders = yield models_1.UniformOrder.findAll({
                    where: {
                        user_id: field.user_id,
                        order_status: field.order_status,
                    },
                });
                if (uniformOrders.length < 1) {
                    throw new Error(`uniform order not found`);
                }
                return {
                    success: true,
                    data: uniformOrders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    delete_uniform_order_by_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.UniformOrder.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result < 1) {
                    throw new Error(`delete un Success`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    get_order_detail_by_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniformOrder = yield models_1.UniformOrder.findByPk(id, {
                    attributes: [
                        'id',
                        'user_id',
                        'position',
                        'date',
                        'delivery_date',
                        'order_status',
                        'notes',
                        'uniform_type',
                        'uniform_size',
                        'quantity',
                    ],
                    include: {
                        model: models_1.User,
                        as: 'user',
                        attributes: ['id', 'name', 'position', 'avatar'],
                        include: [
                            {
                                model: models_1.Department,
                                as: 'department',
                                attributes: ['name'],
                            },
                        ],
                    },
                });
                if (uniformOrder === null) {
                    throw new Error(`uniform order not found`);
                }
                return {
                    success: true,
                    data: uniformOrder,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    update_uniform_order_by_field(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.UniformOrder.update(Object.assign({}, field), {
                    where: {
                        id: field.id,
                    },
                });
                if (result[0] !== 1) {
                    throw new Error(`Update not successful, affected rows: ${result[0]}`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
    GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN(position) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniformOrders = yield models_1.UniformOrder.findAndCountAll({
                    where: {
                        position: position,
                        order_status: 'pending'
                    },
                });
                if (uniformOrders.count < 1) {
                    throw new Error(`uniform order not found`);
                }
                return {
                    success: true,
                    data: uniformOrders,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `--${error === null || error === void 0 ? void 0 : error.message}--`,
                };
            }
        });
    }
}
exports.default = UniformOrderRepository;
