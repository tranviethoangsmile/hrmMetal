import { DataTypes, Model } from 'sequelize';
import { db } from '../dbs';
import { Department } from '../models';
import { shift_work, Products, Position } from '../enum';

class PlanProduction extends Model {
    public id!: string;
    public department_id!: string;
    public date!: string;
    public quantity!: number;
    public product!: Enumerator;
    public position!: Enumerator;
    public is_custom!: boolean;
    public operation_time!: number;
    public work_shift!: Enumerator;
    public production_line!: string;
    public department!: Department;
}

PlanProduction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
        },
        department_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        production_line: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        product: {
            type: DataTypes.ENUM,
            values: Object.values(Products).map(value => value.toString()),
        },
        work_shift: {
            type: DataTypes.ENUM,
            values: Object.values(shift_work).map(value => value.toString()),
        },
        operation_time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        is_custom: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'PlanProduction',
        tableName: 'planproductions',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default PlanProduction;
