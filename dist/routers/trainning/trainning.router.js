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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainning_controller_1 = require("../../controllers/trainning/trainning.controller");
const createTrainning_middleware_1 = require("../../middlewares/createTrainning.middleware");
const veryRoleUpdate_middleware_1 = __importDefault(require("../../middlewares/veryRoleUpdate.middleware"));
const trainning_router_1 = __importDefault(require("./moduleTrainningRouter/trainning.router"));
const multer_1 = __importDefault(require("multer"));
const trainningRouter = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/media/uploads/');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
trainningRouter.post('/', upload.array('media'), createTrainning_middleware_1.create_media_path, veryRoleUpdate_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = req.body;
        const new_media = yield (0, trainning_controller_1.create)(media);
        if (new_media.success) {
            res.status(201).json({
                success: true,
                data: new_media === null || new_media === void 0 ? void 0 : new_media.data,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: new_media.message,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
}));
trainningRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainnings = yield (0, trainning_controller_1.get_all_trainning)();
        if (trainnings === null || trainnings === void 0 ? void 0 : trainnings.success) {
            res.status(201).json({
                success: true,
                data: trainnings === null || trainnings === void 0 ? void 0 : trainnings.data,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: trainnings.message,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
}));
trainningRouter.use('/search', trainning_router_1.default);
exports.default = trainningRouter;
