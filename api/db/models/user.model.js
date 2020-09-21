import { DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../index';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'user'
});

export default User;
