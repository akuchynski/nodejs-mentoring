module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            login: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            age: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            isDeleted: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('user');
    }
};
