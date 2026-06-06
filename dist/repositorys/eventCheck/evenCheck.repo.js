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
class EventCheckRepository {
    create_event_check_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const evenCheck = yield models_1.EventChecks.create(Object.assign({}, field));
                if (evenCheck == null) {
                    throw new Error('create event check error');
                }
                return {
                    success: true,
                    data: evenCheck,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    search_event_checked_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventCheck = yield models_1.EventChecks.findOne({
                    where: Object.assign({}, field),
                });
                if (eventCheck == null) {
                    throw new Error('not exist !!');
                }
                return {
                    success: true,
                    data: eventCheck,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = EventCheckRepository;
