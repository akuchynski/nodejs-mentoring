import { DataTypes, UUIDV4 } from 'sequelize';
import { GROUP_PERMISSIONS } from '../../utils/constans';
import { sequelize } from '../index';

const Group = sequelize.define('group', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ENUM(GROUP_PERMISSIONS)
    }
}, {
    timestamps: false,
    tableName: 'group'
});

export default Group;
