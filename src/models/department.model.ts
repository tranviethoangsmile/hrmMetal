import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '../dbs';

class Department extends Model {
    public id!: number;
    public name!: string;
}

Department.init(
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
    },
    {
        sequelize: db,
        modelName: 'departments',
        tableName: 'departments',
        timestamps: false,
    },
);

export default Department;
