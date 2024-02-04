import { DataTypes, Model } from 'sequelize';
import db from '../dbs/db';
import { DailyReport } from './index';
import { CodeError as codeErrors } from '../enum/codeError.enum';
class CodeError extends Model {
    public id!: string;
    public code!: Enumerator;
    public description!: string;
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
