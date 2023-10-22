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
exports.get_all_canteen = exports.find_canteen_by_id = exports.create_canteen = void 0;
const canteen_useCase_1 = require("../useCases/canteen.useCase");
const create_canteen = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, canteen_useCase_1.create)(data);
});
exports.create_canteen = create_canteen;
const find_canteen_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, canteen_useCase_1.find_canteen)(id);
});
exports.find_canteen_by_id = find_canteen_by_id;
const get_all_canteen = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, canteen_useCase_1.find_all_canteen)();
});
exports.get_all_canteen = get_all_canteen;
