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
exports.create_media_path = void 0;
const cloudinary_config_1 = __importDefault(require("../utils/cloudinary/cloudinary.config"));
const busboy_1 = __importDefault(require("busboy"));
const create_media_path = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bb = (0, busboy_1.default)({ headers: req.headers });
        const urlMedias = [];
        const uploadPromises = [];
        bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const uploadPromise = new Promise((resolve, reject) => {
                const cloudinaryStream = cloudinary_config_1.default.v2.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
                    if (err) {
                        return reject(res.status(200).json({
                            success: false,
                            message: `update media err -- ${err === null || err === void 0 ? void 0 : err.message}`,
                        }));
                    }
                    if (result) {
                        urlMedias.push(result.secure_url);
                    }
                    resolve();
                });
                file.pipe(cloudinaryStream);
            });
            uploadPromises.push(uploadPromise);
        });
        bb.on('field', (fieldname, val) => {
            req.body[fieldname] = val;
        });
        bb.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.all(uploadPromises);
            req.body = Object.assign(Object.assign({}, req.body), { media_path: urlMedias.join(',') });
            next();
        }));
        req.pipe(bb); // Pipe request vào busboy
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
});
exports.create_media_path = create_media_path;
