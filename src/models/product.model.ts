import { Model, DataTypes } from 'sequelize';
import db from '../db/db';
import { User } from './index';
import { Products } from '../enum/product.enum';
class Product extends Model {
    public id!: string;
    public name!: Enumerator;
    public ic_card!: string;
    public user_id!: string;
    public shift!: string;
    public date!: string;
    public quantity!: number;
    public day_code!: string;

    // 
    public user !: User
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.ENUM,
            values: Object.values(Products).map(value => value.toString()),
        },
        ic_card: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shift: {
            type: DataTypes.CHAR(1),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        day_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        paranoid: true,
        timestamps: true,
        modelName: 'products',
        tableName: 'products',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Product;