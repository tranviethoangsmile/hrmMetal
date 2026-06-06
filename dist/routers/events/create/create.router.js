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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const middlewares_1 = require("../../../middlewares");
const helpers_1 = require("../../../helpers");
const createEventsRouter = (0, express_1.Router)();
createEventsRouter.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { media_path } = _a, rest = __rest(_a, ["media_path"]);
        const field = rest;
        if (media_path) {
            field.media = media_path;
        }
        if (!field ||
            !field.name ||
            !field.description ||
            !field.date_end ||
            !field.date_start ||
            !field.position) {
            const missingFields = [
                !field.name && 'name',
                !field.description && 'description',
                !field.date_end && 'date_end',
                !field.date_start && 'date_start',
                !field.position && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const event = yield (0, controllers_1.create_events_controller)(field);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            return (0, helpers_1.errorResponse)(res, 400, event.message || 'Failed to create event');
        }
        return (0, helpers_1.successResponse)(res, 201, event === null || event === void 0 ? void 0 : event.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createEventsRouter;
