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
exports.adminDashboardSummaryUseCase = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const repositorys_1 = require("../../../repositorys");
const orderRepository = new repositorys_1.OrderRepository();
const paidLeadRequestRepository = new repositorys_1.PaidLeaveRequestRepository();
const checkinRepository = new repositorys_1.CheckinRepository();
const userRepository = new repositorys_1.UserRepository;
const uniformRepository = new repositorys_1.UniformOrderRepository();
const adminDashboardSummaryUseCase = (position, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const previousDay = moment_timezone_1.default.tz(date, 'Asia/Tokyo')
            .subtract(1, 'day')
            .format('YYYY-MM-DD');
        const [pending_paid_leave, pending_checkins, pending_orders, users_by_position, paid_leaves, uniforms_pending,] = yield Promise.all([
            paidLeadRequestRepository.GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(position),
            checkinRepository.GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(previousDay, position),
            orderRepository.GET_ALL_ORDERS_OF_POSITION_IN_DATE_FOR_ADMIN(position, date),
            userRepository.GET_ALL_USERS_OF_POSITION_FOR_ADMIN(position),
            checkinRepository.GET_ALL_PAID_LEAVE_OF_POSITION_IN_DATE_FOR_ADMIN(date, position),
            uniformRepository.GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN(position)
        ]);
        if (!pending_paid_leave.success &&
            !pending_checkins.success &&
            !pending_orders.success &&
            !users_by_position.success &&
            !paid_leaves.success &&
            !uniforms_pending.success) {
            throw new Error(`pending_paid_leave: ${pending_paid_leave === null || pending_paid_leave === void 0 ? void 0 : pending_paid_leave.message},
                pending_checkins: ${pending_checkins === null || pending_checkins === void 0 ? void 0 : pending_checkins.message}, 
                pending_orders: ${pending_orders === null || pending_orders === void 0 ? void 0 : pending_orders.message}, 
                users_by_position: ${users_by_position === null || users_by_position === void 0 ? void 0 : users_by_position.message},
                uniforms_pending: ${uniforms_pending === null || uniforms_pending === void 0 ? void 0 : uniforms_pending.message}`);
        }
        return {
            success: true,
            data: {
                pending_paid_leave: pending_paid_leave === null || pending_paid_leave === void 0 ? void 0 : pending_paid_leave.data,
                pending_checkins: pending_checkins === null || pending_checkins === void 0 ? void 0 : pending_checkins.data,
                pending_orders: pending_orders === null || pending_orders === void 0 ? void 0 : pending_orders.data,
                users_by_position: users_by_position === null || users_by_position === void 0 ? void 0 : users_by_position.data,
                paid_leaves: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data,
                uniforms_pending: uniforms_pending === null || uniforms_pending === void 0 ? void 0 : uniforms_pending.data
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.adminDashboardSummaryUseCase = adminDashboardSummaryUseCase;
