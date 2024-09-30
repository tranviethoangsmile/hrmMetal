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
exports.get_all_events_controller = exports.search_event_by_id_controller = exports.update_events_controller = exports.delete_event_controller = exports.create_events_controller = void 0;
const events_useCase_1 = require("../../useCases/events/events.useCase");
const create_events_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, events_useCase_1.create_events_use)(field);
});
exports.create_events_controller = create_events_controller;
const delete_event_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, events_useCase_1.delete_events_use)(id);
});
exports.delete_event_controller = delete_event_controller;
const update_events_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, events_useCase_1.update_events_use)(field);
});
exports.update_events_controller = update_events_controller;
const search_event_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, events_useCase_1.search_event_by_id_use)(id);
});
exports.search_event_by_id_controller = search_event_by_id_controller;
const get_all_events_controller = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, events_useCase_1.get_all_events_use)();
});
exports.get_all_events_controller = get_all_events_controller;
