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
exports.GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN_USE = exports.update_uniform_order_use = exports.get_uniform_order_detail_by_id_use = exports.delete_uniform_order_with_id_use = exports.search_uniform_order_with_user_id_use = exports.search_uniform_order_with_position_use = exports.create_uniform_order_use = void 0;
const repositorys_1 = require("../../repositorys");
const enum_1 = require("../../enum");
const index_1 = require("../index");
const validates_1 = require("../../validates");
const helpers_1 = require("../../helpers");
const uniformOrderRepo = new repositorys_1.UniformOrderRepository();
const create_uniform_order_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_uniform_order)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const user = yield (0, index_1.findUserById)(field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(user === null || user === void 0 ? void 0 : user.message);
        }
        if (!Object.values(enum_1.Position).includes(field.position)) {
            throw new Error(`position of user invalid`);
        }
        for (const item of field.items) {
            if (!Object.values(enum_1.UniformSize).includes(item.uniform_size) ||
                !Object.values(enum_1.UniformType).includes(item.uniform_type)) {
                throw new Error('Invalid uniform size or type');
            }
        }
        const uniformOrder = yield Promise.all(field.items.map((item) => {
            try {
                return uniformOrderRepo.create({
                    user_id: field.user_id,
                    position: field.position,
                    date: field.date,
                    uniform_type: item.uniform_type,
                    uniform_size: item.uniform_size,
                    quantity: item.quantity,
                    notes: field.notes,
                });
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        }));
        const successfulOrders = uniformOrder
            .filter(order => order.success)
            .map(order => order.data);
        if (successfulOrders.length < 1) {
            throw new Error('No uniform orders created');
        }
        return {
            success: true,
            data: successfulOrders,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.create_uniform_order_use = create_uniform_order_use;
const search_uniform_order_with_position_use = (position) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_position)(position);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!(0, helpers_1.isValidEnumValue)(position, enum_1.Position)) {
            throw new Error(`position of user invalid`);
        }
        const uniformOrders = yield uniformOrderRepo.search_all_uniform_order_by_position(position);
        if (!(uniformOrders === null || uniformOrders === void 0 ? void 0 : uniformOrders.success)) {
            throw new Error(`${uniformOrders === null || uniformOrders === void 0 ? void 0 : uniformOrders.message}`);
        }
        return {
            success: true,
            data: uniformOrders.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.search_uniform_order_with_position_use = search_uniform_order_with_position_use;
const search_uniform_order_with_user_id_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_seach_order_processing)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const uniformOrders = yield uniformOrderRepo.search_all_uniform_order_by_user_id(field);
        if (!(uniformOrders === null || uniformOrders === void 0 ? void 0 : uniformOrders.success)) {
            throw new Error(`${uniformOrders === null || uniformOrders === void 0 ? void 0 : uniformOrders.message}`);
        }
        return {
            success: true,
            data: uniformOrders.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.search_uniform_order_with_user_id_use = search_uniform_order_with_user_id_use;
const delete_uniform_order_with_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const unoformOrder = yield get_uniform_order_detail_by_id_use(id);
        if (!(unoformOrder === null || unoformOrder === void 0 ? void 0 : unoformOrder.success)) {
            throw new Error(`${unoformOrder === null || unoformOrder === void 0 ? void 0 : unoformOrder.message}`);
        }
        const result = yield uniformOrderRepo.delete_uniform_order_by_id(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.delete_uniform_order_with_id_use = delete_uniform_order_with_id_use;
const get_uniform_order_detail_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const uniformOrderDetail = yield uniformOrderRepo.get_order_detail_by_id(id);
        if (!(uniformOrderDetail === null || uniformOrderDetail === void 0 ? void 0 : uniformOrderDetail.success)) {
            throw new Error(`${uniformOrderDetail === null || uniformOrderDetail === void 0 ? void 0 : uniformOrderDetail.message}`);
        }
        return {
            success: true,
            data: uniformOrderDetail === null || uniformOrderDetail === void 0 ? void 0 : uniformOrderDetail.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.get_uniform_order_detail_by_id_use = get_uniform_order_detail_by_id_use;
const update_uniform_order_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_update_uniform_order)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const uniformOrder = yield get_uniform_order_detail_by_id_use(field.id);
        if (!(uniformOrder === null || uniformOrder === void 0 ? void 0 : uniformOrder.success)) {
            throw new Error(`${uniformOrder === null || uniformOrder === void 0 ? void 0 : uniformOrder.message}`);
        }
        if (field.uniform_size) {
            if (!Object.keys(enum_1.UniformSize).includes(field.uniform_size)) {
                throw new Error('Invalid uniform size');
            }
        }
        const result = yield uniformOrderRepo.update_uniform_order_by_field(Object.assign({}, field));
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.update_uniform_order_use = update_uniform_order_use;
const GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN_USE = (position) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, helpers_1.isValidEnumValue)(position, enum_1.Position)) {
            throw new Error(`position not valid`);
        }
        const uniforms = yield uniformOrderRepo.GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN(position);
        if (!(uniforms === null || uniforms === void 0 ? void 0 : uniforms.success)) {
            throw new Error(`${uniforms === null || uniforms === void 0 ? void 0 : uniforms.message}`);
        }
        return {
            success: true,
            data: uniforms === null || uniforms === void 0 ? void 0 : uniforms.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use -- ${error.message}`,
        };
    }
});
exports.GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN_USE = GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN_USE;
