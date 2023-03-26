import { DataTypes, Model } from 'sequelize';
import db from '../dbs/db';
class Food extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
}

Food.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'food',
        tableName: 'foods',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: false,
        deletedAt: 'deleted_at',
    },
);

export default Food;
