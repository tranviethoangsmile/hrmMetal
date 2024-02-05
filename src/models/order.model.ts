import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import User from './user.model';
import { Position } from '../enum/Position.enum';

class Order extends Model {
    public id!: string;
    public date!: string;
    public user_id!: string;
    public dayOrNight!: string;
    public position!: string;
    public isConfirmed!: boolean;
    public isPicked!: boolean;
    // associate with model
    public user!: User;
}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dayOrNight: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isPicked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
        },
    },
    {
        sequelize: db,
        modelName: 'order',
        tableName: 'orders',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Order;
