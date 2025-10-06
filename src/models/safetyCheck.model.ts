import { db } from '../dbs';
import { DataTypes, Model } from 'sequelize';

class SafetyChecks extends Model {
    public id!: string;
    public user_id!: string;
    public event_id!: string;
    public is_safety!: boolean;
    public feedback!: string;
    public is_at_home!: boolean;
    public is_can_work!: boolean;
}

SafetyChecks.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_safety: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_at_home: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_can_work: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'safety_checks',
        tableName: 'safety_checks',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default SafetyChecks;
