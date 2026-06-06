"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const enum_1 = require("../enum");
class PlanProduction extends sequelize_1.Model {
}
PlanProduction.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.Position).map(value => value.toString()),
    },
    department_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    production_line: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    product: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.Products).map(value => value.toString()),
    },
    work_shift: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.shift_work).map(value => value.toString()),
    },
    operation_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    is_custom: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'PlanProduction',
    tableName: 'planproductions',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = PlanProduction;
