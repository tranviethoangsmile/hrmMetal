import { DataTypes, Model } from 'sequelize';
import { db } from '../dbs';

class Canteen extends Model {
    public id!: string;
    public factory_name!: string;
    public description!: string;
}

Canteen.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        factory_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Canteen',
        tableName: 'canteens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    },
);

export default Canteen;
