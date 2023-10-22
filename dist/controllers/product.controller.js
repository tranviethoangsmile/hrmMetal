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
exports.search_product = exports.create_product = void 0;
const product_useCase_1 = require("../useCases/product.useCase");
const create_product = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, product_useCase_1.product_create)(data);
});
exports.create_product = create_product;
const search_product = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, product_useCase_1.product_search)(data);
});
exports.search_product = search_product;
