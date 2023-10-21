import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';
import User from './user.model';
import { Products } from '../enum/Product.enum';
class Trainning extends Model {
    public id!: string;
    public trainning_name!: string;
    public product_name!: string;
    public description!: string;
    public media_path!: [];
    public user_id!: string;
    //
    public user!: User;
}

Trainning.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        trainning_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.ENUM,
            values: Object.values(Products).map(value => value.toString()),
        },
        media_path: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        paranoid: true,
        timestamps: true,
        modelName: 'trainnings',
        tableName: 'trainnings',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Trainning;
