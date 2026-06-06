"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const models_1 = require("../models");
class TaxDependent extends sequelize_1.Model {
}
TaxDependent.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: models_1.User,
            key: 'id',
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    identification_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    media_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    relationship: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tax_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    deduction_amount: {
        type: sequelize_1.DataTypes.DECIMAL(15, 2),
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'taxDependent',
    tableName: 'tax_dependents',
    timestamps: true,
    // paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = TaxDependent;
