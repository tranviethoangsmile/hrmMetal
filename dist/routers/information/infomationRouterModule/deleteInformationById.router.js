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
const express_1 = require("express");
const information_controller_1 = require("../../../controllers/information/information.controller");
const delete_media_url_middleware_1 = __importDefault(require("../../../middlewares/delete_media_url.middleware"));
const deleteInformation = (0, express_1.Router)();
deleteInformation.post('/', delete_media_url_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Missing parameter: id',
            });
        }
        else {
            const delete_result = yield (0, information_controller_1.delete_information_by_id_controller)(id);
            if (delete_result === null || delete_result === void 0 ? void 0 : delete_result.success) {
                return res.status(202).json({
                    success: true,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = deleteInformation;
