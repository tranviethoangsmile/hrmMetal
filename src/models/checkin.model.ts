import { DataTypes, Model } from 'sequelize';
import { db } from '../dbs';
import { User } from '../models';
import { shift_work } from '../enum';
class Checkin extends Model {
    public id!: string;
    public user_id!: string;
    public time_in!: string;
    public time_out!: string;
    public date!: string;
    public work_time!: Number;
    public go_out!: string;
    public go_in!: string;
    public over_time!: Number;
    public work_shift!: Enumerator;
    public is_weekend!: boolean;
    public is_checked!: boolean;
    public is_paid_leave!: boolean;
    //
    public user!: User;
}

Checkin.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time_in: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time_out: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        work_time: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        go_out: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        go_in: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        over_time: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        is_weekend: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        work_shift: {
            type: DataTypes.ENUM,
            values: Object.values(shift_work).map(value => value.toString()),
        },
        is_checked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_paid_leave: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        paranoid: true,
        timestamps: true,
        modelName: 'checkin',
        tableName: 'checkins',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Checkin;
