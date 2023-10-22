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
exports.find_report_by_id = exports.find_report = exports.find_all_report = exports.daily_report_create = void 0;
const dailyReport_useCase_1 = require("../useCases/dailyReport.useCase");
const daily_report_create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dailyReport_useCase_1.create_daily_report)(data);
});
exports.daily_report_create = daily_report_create;
const find_all_report = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dailyReport_useCase_1.find_all_rp)();
});
exports.find_all_report = find_all_report;
const find_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dailyReport_useCase_1.search_daily_report)(data);
});
exports.find_report = find_report;
const find_report_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dailyReport_useCase_1.find_rp_by_id)(id);
});
exports.find_report_by_id = find_report_by_id;
