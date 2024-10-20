import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import { User } from '../models';
import { UniformType, UniformSize } from '../enum';
class UniformOrder extends Model {
    public id!: string;
    public user_id!: string;
    public position!: string;
    public uniform_type!: Enumerator;
    public uniform_size!: Enumerator;
    public date!: string;
    public order_status!: string;
    public quantity!: string;
    public delivery_date!: string;
    public notes!: string;
}

UniformOrder.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uniform_type: {
            type: DataTypes.ENUM,
            values: Object.values(UniformType).map(value => value.toString()),
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        },
        delivery_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uniform_size: {
            type: DataTypes.ENUM,
            values: Object.values(UniformSize).map(value => value.toString()),
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: 'UniformOrder',
        tableName: 'uniformorders',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default UniformOrder;
