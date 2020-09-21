export function up(queryInterface) {
    return queryInterface.bulkInsert('user_group', [{
        userId: 'ef3c2ef2-4659-4823-8a82-c775210bc7e3',
        groupId: 'a188a77c-1a58-4d1b-8538-b32b79e71773'
    }, {
        userId: 'ef3c2ef2-4659-4823-8a82-c775210bc7e3',
        groupId: 'f8ad73cb-9d25-4466-9005-8328c91e14c8'
    }, {
        userId: '46af883a-71b1-4a55-b634-657a914c61b4',
        groupId: 'a188a77c-1a58-4d1b-8538-b32b79e71773'
    }]);
}
export function down(queryInterface) {
    return queryInterface.bulkDelete('user_group', {
        userId: [
            'ef3c2ef2-4659-4823-8a82-c775210bc7e3',
            '46af883a-71b1-4a55-b634-657a914c61b4'
        ]
    });
}
