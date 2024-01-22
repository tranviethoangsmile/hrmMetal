"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const Position_enum_1 = require("../enum/Position.enum");
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dayOrNight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(Position_enum_1.Position).map(value => value.toString()),
    },
}, {
    sequelize: db_1.default,
    modelName: 'order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Order;
