"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const product_enum_1 = require("../enum/product.enum");
const db_1 = __importDefault(require("../dbs/db"));
class DailyReport extends sequelize_1.Model {
}
DailyReport.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        primaryKey: true,
    },
    product: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(product_enum_1.Products).map(value => value.toString()),
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    shift: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    operator_history: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    operated_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    shutdown_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    active_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'dailyreport',
    tableName: 'dailyreports',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = DailyReport;
