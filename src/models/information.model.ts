import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import { Position } from '../enum/Position.enum';
class Information extends Model {
    public id!: number;
    public date!: string;
    public user_id!: string;
    public content!: string;
    public title!: string;
    public image!: string;
    public position!: Enumerator;
}

Information.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
        },
    },
    {
        sequelize: db,
        modelName: 'information',
        tableName: 'informations',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Information;
