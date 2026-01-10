import { Model, DataTypes } from "sequelize";
import { db } from "../dbs";
import { TaxDependent } from "../models";

class DependentSupportAmount extends Model {
    public id!: string;
    public tax_dependent_id!: string;
    public year!: number;
    public supported_amount!: number;
    public is_supporting_current_year!: boolean;
    public expected_support_years!: number;
    public notes!: string;
}

DependentSupportAmount.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true

    },
    tax_dependent_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: TaxDependent,
            key: 'id'
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    supported_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    is_supporting_current_year: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    expected_support_years: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},{
    sequelize: db,
        modelName: 'dependentSupportAmount',
        tableName: 'dependent_support_amounts',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
})

export default DependentSupportAmount;
