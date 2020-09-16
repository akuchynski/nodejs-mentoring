export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
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
}
export async function down(queryInterface) {
    await queryInterface.dropTable('user');
}
