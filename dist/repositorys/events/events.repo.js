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
const models_1 = require("../../models");
class EventRepository {
    create_events_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.Events.create(Object.assign({}, field));
                if (event == null) {
                    throw new Error('Error creating event');
                }
                return {
                    success: true,
                    data: event,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    delete_events_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Events.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result !== 1) {
                    throw new Error('Error deleting event');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    update_events_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(field);
                const event = yield models_1.Events.update(Object.assign({}, field), {
                    where: {
                        id: field.id,
                    },
                });
                if (event[0] !== 1) {
                    throw new Error('Error updating event');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    search_event_by_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.Events.findOne({
                    where: {
                        id: id,
                        is_active: true,
                    },
                });
                if (event == null) {
                    throw new Error('Event not found or not avaliable');
                }
                return {
                    success: true,
                    data: event,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    get_all_event_repo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield models_1.Events.findAll({
                    where: { is_active: true },
                });
                if (events.length < 1) {
                    throw new Error('Event not exist!!!');
                }
                return {
                    success: true,
                    data: events,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
}
exports.default = EventRepository;
