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
class DayOffsRepository {
    /**
     * Create a new day-off record
     * @param field - Data for creating a day-off
     * @returns Success or failure response
     */
    CREATE(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOff = yield models_1.DayOffs.create(field);
                if (dayOff === null) {
                    throw new Error(`Failed to create day off`);
                }
                return {
                    success: true,
                    data: dayOff,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    /**
     * Get all day-off records
     * @returns List of day-off records with user details
     */
    GET_ALL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOffs = yield models_1.DayOffs.findAll({
                    attributes: ['id', 'date', 'user_id'],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['name', 'avatar'],
                            as: 'userDetail',
                        },
                    ],
                });
                if (!dayOffs || dayOffs.length === 0) {
                    throw new Error(`No day-off records found`);
                }
                return {
                    success: true,
                    data: dayOffs,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    /**
     * Get a day-off record by ID
     * @param id - ID of the day-off record
     * @returns Day-off record details
     */
    GET_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOff = yield models_1.DayOffs.findByPk(id, {
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['name', 'avatar'],
                            as: 'userDetail',
                        },
                    ],
                    attributes: ['id', 'user_id', 'date'],
                });
                if (!dayOff) {
                    throw new Error(`Day-off record not found`);
                }
                return {
                    success: true,
                    data: dayOff,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    /**
     * Delete a day-off record by ID
     * @param id - ID of the day-off record to delete
     * @returns Success or failure response
     */
    DELETE(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOff = yield models_1.DayOffs.destroy({
                    where: {
                        id,
                    },
                });
                if (dayOff === 0) {
                    throw new Error(`Failed to delete day off`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    UPDATE(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dayOff = yield models_1.DayOffs.update(field, {
                    where: {
                        id: field.id,
                    },
                });
                if (dayOff[0] === 0) {
                    throw new Error(`Failed to update day off`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository:: ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = DayOffsRepository;
