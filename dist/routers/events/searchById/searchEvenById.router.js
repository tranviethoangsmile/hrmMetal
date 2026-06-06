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
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const searchEventById = (0, express_1.Router)();
searchEventById.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
        const event = yield (0, controllers_1.search_event_by_id_controller)(id);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            return (0, helpers_1.errorResponse)(res, 404, (event === null || event === void 0 ? void 0 : event.message) || 'Event not found');
        }
        return (0, helpers_1.successResponse)(res, 200, event === null || event === void 0 ? void 0 : event.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = searchEventById;
