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
const events_controller_1 = require("../../../controllers/events/events.controller");
const getAllEventRouter = (0, express_1.Router)();
getAllEventRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, events_controller_1.get_all_events_controller)();
        if (!(events === null || events === void 0 ? void 0 : events.success)) {
            return res.status(200).json({
                success: false,
                message: events === null || events === void 0 ? void 0 : events.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: events === null || events === void 0 ? void 0 : events.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = getAllEventRouter;
