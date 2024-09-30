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
const updateEventsRouter = (0, express_1.Router)();
updateEventsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !field.id) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const result = yield (0, events_controller_1.update_events_controller)(field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return res.status(200).json({
                success: false,
                message: result === null || result === void 0 ? void 0 : result.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = updateEventsRouter;
