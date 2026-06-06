"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEnumValue = void 0;
const isValidEnumValue = (value, enumObject) => {
    return Object.values(enumObject).includes(value);
};
exports.isValidEnumValue = isValidEnumValue;
