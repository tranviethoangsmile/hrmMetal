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
exports.delCache = exports.getCache = exports.setCache = void 0;
const dbs_1 = require("../../dbs");
const setCache = (key, value, expiration) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbs_1.redis.set(key, value, 'EX', expiration);
});
exports.setCache = setCache;
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbs_1.redis.get(key);
});
exports.getCache = getCache;
const delCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbs_1.redis.del(key);
});
exports.delCache = delCache;
