"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbs_1 = require("../dbs");
const sequelize_1 = require("sequelize");
const product_enum_1 = require("../enum/product.enum");
class Trainning extends sequelize_1.Model {
}
Trainning.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    trainning_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    product_name: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(product_enum_1.Products).map(value => value.toString()),
    },
    media_path: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbs_1.db,
    paranoid: true,
    timestamps: true,
    modelName: 'trainnings',
    tableName: 'trainnings',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Trainning;
