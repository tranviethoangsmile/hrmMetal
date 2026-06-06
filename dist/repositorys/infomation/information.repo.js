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
class InformationRepository {
    create_information_repo(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newInfomation = yield models_1.Information.create(Object.assign({}, value));
                if (newInfomation === null) {
                    throw new Error(`create infomation unSuccessful`);
                }
                return {
                    success: true,
                    data: newInfomation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    search_information_of_user_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const informations = yield models_1.Information.findAll({
                    where: {
                        user_id: id,
                    },
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'date',
                        'media',
                        'position',
                        'is_public',
                        'is_video',
                        'is_event',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['id', 'name', 'role'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (informations === null) {
                    throw new Error(`information not found`);
                }
                return {
                    success: true,
                    data: informations,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    search_information_by_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const information = yield models_1.Information.findOne({
                    where: {
                        id: id,
                    },
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'date',
                        'media',
                        'position',
                        'is_public',
                        'is_video',
                        'is_event',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['id', 'name', 'role'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (information === null) {
                    throw new Error(`information not exist`);
                }
                return {
                    success: true,
                    data: information,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    search_information_all_with_field_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const informations = yield models_1.Information.findAll({
                    where: Object.assign({}, field),
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'date',
                        'media',
                        'position',
                        'is_public',
                        'is_video',
                        'is_event',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['id', 'name', 'role', 'avatar'],
                        },
                    ],
                });
                if (informations === null) {
                    throw new Error(`information not found`);
                }
                return {
                    success: true,
                    data: informations,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    delete_information_by_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Information.destroy({ where: { id } });
                if (result === 1) {
                    return {
                        success: true,
                    };
                }
                else {
                    throw new Error(`delete not successfull, please try again later`);
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
}
exports.default = InformationRepository;
