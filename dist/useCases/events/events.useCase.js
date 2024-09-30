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
exports.get_all_events_use = exports.search_event_by_id_use = exports.update_events_use = exports.delete_events_use = exports.create_events_use = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const events_validate_1 = require("../../validates/events/events.validate");
const Position_enum_1 = require("../../enum/Position.enum");
const eventRepository = new repositorys_1.EventRepository();
const create_events_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, events_validate_1.validate_create_events)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message);
        }
        if (typeof field.position === 'string' &&
            !Object.values(Position_enum_1.Position).includes(field.position)) {
            throw new Error('position is not valid');
        }
        const event = yield eventRepository.create_events_repo(field);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            throw new Error(event === null || event === void 0 ? void 0 : event.message);
        }
        return {
            success: true,
            data: event === null || event === void 0 ? void 0 : event.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_events_use = create_events_use;
const delete_events_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_b = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _b === void 0 ? void 0 : _b.message);
        }
        const result = yield eventRepository.delete_events_repo(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.delete_events_use = delete_events_use;
const update_events_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const isValid = (0, events_validate_1.validate_update_events)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_c = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _c === void 0 ? void 0 : _c.message);
        }
        const event = yield eventRepository.search_event_by_id_repo(field.id);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            throw new Error(event === null || event === void 0 ? void 0 : event.message);
        }
        const result = yield eventRepository.update_events_repo(Object.assign({}, field));
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.update_events_use = update_events_use;
const search_event_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error((_d = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _d === void 0 ? void 0 : _d.message);
        }
        const event = yield eventRepository.search_event_by_id_repo(id);
        if (!(event === null || event === void 0 ? void 0 : event.success)) {
            throw new Error(event === null || event === void 0 ? void 0 : event.message);
        }
        return {
            success: true,
            data: event === null || event === void 0 ? void 0 : event.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_event_by_id_use = search_event_by_id_use;
const get_all_events_use = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventRepository.get_all_event_repo();
        if (!(events === null || events === void 0 ? void 0 : events.success)) {
            throw new Error(events === null || events === void 0 ? void 0 : events.message);
        }
        return {
            success: true,
            data: events === null || events === void 0 ? void 0 : events.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.get_all_events_use = get_all_events_use;
