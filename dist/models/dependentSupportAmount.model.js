"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const models_1 = require("../models");
class DependentSupportAmount extends sequelize_1.Model {
}
DependentSupportAmount.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    tax_dependent_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: models_1.TaxDependent,
            key: 'id'
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: models_1.User,
            key: 'id'
        }
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    supported_amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    is_supporting_current_year: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_confirm: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    expected_support_years: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    media_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize: dbs_1.db,
    modelName: 'dependentSupportAmount',
    tableName: 'dependent_support_amounts',
    timestamps: true,
    // paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = DependentSupportAmount;
