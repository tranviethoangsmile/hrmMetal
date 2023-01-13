import { Model, DataTypes } from 'sequelize';
import db from '../db/db';
import User from './user.model';
import Food from './food.model';
import Canteen from './canteen.model';

class Order extends Model {
    public id!: string;
    public date!: string;
    public user_id!: string;
    public food_id!: string;
    public canteen_id!: string;

    // associate with model
    public user!: User;
    public food!: Food;
    public canteen!: Canteen;
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
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        food_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        canteen_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: 'order',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Order;
