const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
            defaultValue: false,
            allowNull: false
        }
    }, {
        tableName: 'user',
        timestamps: false
    });
};