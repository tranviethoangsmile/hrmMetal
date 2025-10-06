import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';
import { User } from './index';

class Payroll extends Model {
    public id!: string;
    public user_id!: string;
    public date!: string;
    public pay_date!: string;
    public work_time!: number;
    public over_time!: number;
    public paid_vacation_days!: number;
    public weekend_time!: number;
    public paid_vacation_pay!: number;
    public work_salary!: number;
    public shift_night_salary!: number;
    public over_time_salary!: number;
    public refund_money!: number;
    public other_pay!: number;
    public weekend_salary!: number;
    public attendance_allowance_pay!: number;
    public travel_allowance_pay!: number;
    public bonus_pay!: number;
    public gross_salary!: number;
    public income_tax!: number;
    public social_insurance!: number;
    public health_insurance!: number;
    public uniform_deduction!: number;
    public accident_insurance!: number;
    public club_fee!: number;
    public rent_home!: number;
    public cost_of_living!: number;
    public other_deduction!: number;
    public net_salary!: number;
    public shift_night!: number;
    public is_active!: boolean;

    public user!: User;
}

Payroll.init(
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
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pay_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        work_time: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        over_time: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        paid_vacation_days: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        weekend_time: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        paid_vacation_pay: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        work_salary: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        shift_night_salary: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        over_time_salary: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        refund_money: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        other_pay: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        weekend_salary: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        attendance_allowance_pay: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        travel_allowance_pay: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        bonus_pay: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        gross_salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        income_tax: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        social_insurance: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        health_insurance: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        uniform_deduction: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        accident_insurance: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        club_fee: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        rent_home: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        cost_of_living: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        other_deduction: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        shift_night: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0,
        },
        net_salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: 'Payroll',
        tableName: 'payrolls',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);
export default Payroll;
