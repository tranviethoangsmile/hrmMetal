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
const getAllEventRouter = (0, express_1.Router)();
getAllEventRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, controllers_1.get_all_events_controller)();
        if (!(events === null || events === void 0 ? void 0 : events.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (events === null || events === void 0 ? void 0 : events.message) || 'Failed to get events');
        }
        return (0, helpers_1.successResponse)(res, 200, events === null || events === void 0 ? void 0 : events.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getAllEventRouter;
