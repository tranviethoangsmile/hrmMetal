import { DataTypes, Model } from 'sequelize';
import db from '../dbs/db';
import { DailyReport } from './index';
import { CodeError as codeErrors } from '../enum/CodeError.enum';
class CodeError extends Model {
    public id!: string;
    public code!: Enumerator;
    public description!: string;
    public shutdown_time!: number;
    public daily_report_id!: string;

    public dailyReport!: DailyReport;
}

CodeError.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        code: {
            type: DataTypes.ENUM,
            values: Object.values(codeErrors).map(value => value.toString()),
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shutdown_time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        daily_report_id: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        modelName: 'codeerrors',
        tableName: 'codeerrors',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default CodeError;
