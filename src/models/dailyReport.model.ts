import { DataTypes, Model } from 'sequelize';
import { User } from './index';
import { Product } from '../enum/product.enum';
import db from '../db/db';

class DailyReport extends Model {
    public id!: string;
    public product!: Enumerator;
    public user_id!: string;
    public date!: string;
    public shift!: string;
    public quantity!: number;
    public operator_history!: string;
    public operated_time!: number;
    public shutdown_time!: number;
    public active_time!: number;
//
    public user!: User;
}

DailyReport.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        product: {
            type: DataTypes.ENUM,
            values:  Object.values(Product).map(value => value.toString()),
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        shift: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        operator_history: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        operated_time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        shutdown_time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        active_time: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    }, 
    {
        sequelize: db,
        modelName: 'dailyreport',
        tableName: 'dailyreports',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }

);

export default DailyReport
