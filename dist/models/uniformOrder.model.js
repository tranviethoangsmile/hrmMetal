"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const enum_1 = require("../enum");
class UniformOrder extends sequelize_1.Model {
}
UniformOrder.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    uniform_type: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.UniformType).map(value => value.toString()),
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    order_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    delivery_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    uniform_size: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.UniformSize).map(value => value.toString()),
    },
    notes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'UniformOrder',
    tableName: 'uniformorders',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = UniformOrder;
