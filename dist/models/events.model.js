"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const enum_1 = require("../enum");
class Events extends sequelize_1.Model {
}
Events.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    date_start: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_end: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.Position).map(value => value.toString()),
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    media: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_safety: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: dbs_1.db,
    paranoid: true,
    timestamps: true,
    modelName: 'events',
    tableName: 'events',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Events;
