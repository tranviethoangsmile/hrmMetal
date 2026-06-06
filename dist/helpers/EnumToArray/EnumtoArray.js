"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enumToArray = (enumObj) => Object.values(enumObj).filter((v) => typeof v === 'string');
exports.default = enumToArray;
