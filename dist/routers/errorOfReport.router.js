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
const express_1 = require("express");
const errorOfReport_controller_1 = require("../controllers/errorOfReport.controller");
const errOfRpRouter = (0, express_1.Router)();
errOfRpRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daily_report_id = req.body;
        if (daily_report_id != null) {
            const errs = yield (0, errorOfReport_controller_1.find_err_of_report)(daily_report_id);
            if (errs === null || errs === void 0 ? void 0 : errs.success) {
                res.status(201).send({
                    success: true,
                    data: errs === null || errs === void 0 ? void 0 : errs.data,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: errs === null || errs === void 0 ? void 0 : errs.message,
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'daily_report_id not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = errOfRpRouter;
