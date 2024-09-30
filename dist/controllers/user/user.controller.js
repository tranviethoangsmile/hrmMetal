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
exports.getUserForLeaveFeatureControll = exports.findAllUserWithFieldControll = exports.findAll = exports.findByName = exports.findById = exports.destroy = exports.update = exports.create = void 0;
const user_useCase_1 = require("../../useCases/user/user.useCase");
const getUserForLeaveFeatureControll = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.getUserForLeaveFeatureUse)(id);
});
exports.getUserForLeaveFeatureControll = getUserForLeaveFeatureControll;
const findAllUserWithFieldControll = (filed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.userFindAllWithFieldUse)(filed);
});
exports.findAllUserWithFieldControll = findAllUserWithFieldControll;
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.createNewUser)(user);
});
exports.create = create;
const update = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.updateUser)(user);
});
exports.update = update;
const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.deleteUser)(id);
});
exports.destroy = destroy;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.findUserById)(id);
});
exports.findById = findById;
const findByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.findUserByName)(name);
});
exports.findByName = findByName;
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_useCase_1.findAllUser)();
});
exports.findAll = findAll;
