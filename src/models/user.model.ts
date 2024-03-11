import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import Department from './department.model';
import { Role } from '../enum/Role.enum';
import { Position } from '../enum/Position.enum';
class User extends Model {
    public id!: number;
    public name!: string;
    public user_name!: string;
    public email!: string;
    public password!: string;
    public dob!: string;
    public phone!: string;
    public avatar!: string;
    public ic_id!: string;
    public employee_id!: number;
    public is_active!: boolean;
    public is_admin!: boolean;
    public role!: Enumerator;
    public position!: Enumerator;
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
        user_name: {
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
        ic_id: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(Role).map(value => value.toString()),
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
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
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default User;
