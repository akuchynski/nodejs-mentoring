export function up(queryInterface) {
    return queryInterface.bulkInsert('user', [{
        id: 'ef3c2ef2-4659-4823-8a82-c775210bc7e3',
        login: 'demo-user1',
        password: 'password1',
        age: '21',
        isDeleted: 'false'
    }, {
        id: '46af883a-71b1-4a55-b634-657a914c61b4',
        login: 'demo-user2',
        password: 'password2',
        age: '22',
        isDeleted: 'false'
    }, {
        id: '0cf33963-e04d-40b5-ac38-48b2f56fec04',
        login: 'demo-user3',
        password: 'password3',
        age: '23',
        isDeleted: 'false'
    }, {
        id: '527cd779-841b-45ab-a99f-0a96d437a1f1',
        login: 'demo-user4',
        password: 'password4',
        age: '24',
        isDeleted: 'false'
    }, {
        id: '6eca374d-6bb0-4ac2-8d1e-f2be7689d861',
        login: 'demo-user5',
        password: 'password5',
        age: '25',
        isDeleted: 'false'
    }]);
}
export function down(queryInterface) {
    return queryInterface.bulkDelete('user', {
        login: [
            'demo-user1',
            'demo-user2',
            'demo-user3',
            'demo-user4',
            'demo-user5'
        ]
    });
}
