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
exports.update_is_active = exports.get_all = exports.create = void 0;
const paidLeaveRequest_useCase_1 = require("../useCases/paidLeaveRequest.useCase");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.create_paid_leave)(data);
});
exports.create = create;
const get_all = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.find_paid_leave)();
});
exports.get_all = get_all;
const update_is_active = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.update_paid_leave)(data);
});
exports.update_is_active = update_is_active;
