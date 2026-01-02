import { Model, DataTypes } from 'sequelize';
import {db} from '../dbs';
import { User } from '../models';
class TaxDependent extends Model {
    public id!: string;
    public user_id!: string;
    public name!: string;
    public dob!: string;
    public gender!: string;
    public identification_number!: string;
    public phone!: string;
    public address!: string;
    public relationship!: string;
    public tax_code!: string;
    public deduction_amount!: number;
    public status!: string;
    public notes!: string;
    public user!: User;
}

TaxDependent.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identification_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tax_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deduction_amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING',
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize: db,
        modelName: 'taxDependent',
        tableName: 'tax_dependents',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default TaxDependent;