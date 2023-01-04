import { Model, DataTypes, Sequelize } from 'sequelize';
import db from '../db/db';
import Department from './department.model';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public dob!: string;
    public phone!: string;
    public avatar!: string;
    public employee_id!: number;
    public is_active!: boolean;
    public is_admin!: boolean;
    public role!: string;
    public position!: string;
    public department_id!: string;

    public department!: Department;
}

User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USER',
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'STAFF',
        },
        department_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'users',
        tableName: 'users',
        timestamps: true,
    },
);

export default User;
