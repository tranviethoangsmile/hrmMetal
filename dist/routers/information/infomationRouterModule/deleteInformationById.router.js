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
const helpers_1 = require("../../../helpers");
const deleteInformation = (0, express_1.Router)();
deleteInformation.post('/', delete_media_url_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'Missing parameter: id');
        }
        else {
            const delete_result = yield (0, information_controller_1.delete_information_by_id_controller)(id);
            if (delete_result === null || delete_result === void 0 ? void 0 : delete_result.success) {
                return (0, helpers_1.successResponse)(res, 200, undefined, 'Information deleted successfully');
            }
            else {
                return (0, helpers_1.errorResponse)(res, 400, (delete_result === null || delete_result === void 0 ? void 0 : delete_result.message) || 'Failed to delete information');
            }
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = deleteInformation;
