"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const product_enum_1 = require("../enum/product.enum");
class Inventory extends sequelize_1.Model {
}
Inventory.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    product: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: Object.values(product_enum_1.Products).map(value => value.toString()),
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    department_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbs_1.db,
    paranoid: true,
    timestamps: true,
    modelName: 'inventory',
    tableName: 'inventorys',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Inventory;
