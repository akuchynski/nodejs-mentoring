export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_group', {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        groupId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: {
                model: 'group',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('user_group');
}
