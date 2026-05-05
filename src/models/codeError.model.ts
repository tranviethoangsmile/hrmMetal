import { DataTypes, Model } from 'sequelize';
import { db } from '../dbs';
import  DailyReport from './dailyReport.model';
class CodeError extends Model {
    public id!: string;
    public code!: string;
    public description!: string;
    public shutdown_time!: number;
    public error_date!: string;
    public daily_report_id!: string;
    public daily_report!: DailyReport;
}

CodeError.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        shutdown_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        error_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        daily_report_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'dailyreports',
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        modelName: 'codeerrors',
        tableName: 'codeerrors',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default CodeError;
