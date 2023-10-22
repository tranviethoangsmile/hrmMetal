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
const trainning_controller_1 = require("../../controllers/trainning.controller");
const TrainningRouter = (0, express_1.Router)();
TrainningRouter.get('/:product_name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.params.product_name;
        console.log(data);
        if (!data) {
            res.status(400).send({
                success: false,
                message: 'values not empty',
            });
        }
        else {
            const trainnings = yield (0, trainning_controller_1.search_all_trainning)(data);
            if (trainnings === null || trainnings === void 0 ? void 0 : trainnings.success) {
                if (((_a = trainnings === null || trainnings === void 0 ? void 0 : trainnings.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    res.status(201).send({
                        success: false,
                        message: 'Product not exist',
                    });
                }
                else {
                    res.status(201).send({
                        success: true,
                        data: trainnings === null || trainnings === void 0 ? void 0 : trainnings.data,
                    });
                }
            }
            else {
                res.status(200).send({
                    success: false,
                    message: trainnings === null || trainnings === void 0 ? void 0 : trainnings.message,
                });
            }
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error:' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = TrainningRouter;
