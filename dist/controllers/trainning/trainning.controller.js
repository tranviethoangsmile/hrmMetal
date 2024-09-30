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
exports.search_all_trainning = exports.get_all_trainning = exports.create = void 0;
const trainning_useCase_1 = require("../../useCases/trainning/trainning.useCase");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, trainning_useCase_1.Create)(data);
});
exports.create = create;
const get_all_trainning = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, trainning_useCase_1.Get_all_trainning)();
});
exports.get_all_trainning = get_all_trainning;
const search_all_trainning = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, trainning_useCase_1.Search_all_trainning)(data);
});
exports.search_all_trainning = search_all_trainning;
