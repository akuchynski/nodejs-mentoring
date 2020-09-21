export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('group', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        permissions: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.ENUM([
                'READ',
                'WRITE',
                'DELETE',
                'SHARE',
                'UPLOAD_FILES'
            ]))
        }
    });
}
export async function down(queryInterface) {
    await queryInterface.dropTable('group');
}
