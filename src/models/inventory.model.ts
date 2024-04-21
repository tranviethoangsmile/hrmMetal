import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';
import { Products } from '../enum/product.enum';

class Inventory extends Model {
    public id!: string;
    public product!: Enumerator;
    public quantity!: number;
}

Inventory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        product: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(Products).map(value => value.toString()),
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        paranoid: true,
        timestamps: true,
        modelName: 'inventory',
        tableName: 'inventorys',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Inventory;
