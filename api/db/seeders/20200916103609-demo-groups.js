export function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('group', [{
        id: 'f8ad73cb-9d25-4466-9005-8328c91e14c8',
        name: 'demo-group1',
        permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\']::"enum_group_permissions"[]')
    }, {
        id: 'a188a77c-1a58-4d1b-8538-b32b79e71773',
        name: 'demo-group2',
        permissions: Sequelize.literal('ARRAY[\'READ\']::"enum_group_permissions"[]')
    }]);
}
export function down(queryInterface) {
    return queryInterface.bulkDelete('group', {
        name: [
            'demo-group1',
            'demo-group2'
        ]
    });
}

