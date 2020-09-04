module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('user', [{
            login: 'demo-user1',
            password: 'password1',
            age: '21',
            isDeleted: 'false'
        }, {
            login: 'demo-user3',
            password: 'password2',
            age: '22',
            isDeleted: 'false'
        }, {
            login: 'demo-user3',
            password: 'password3',
            age: '23',
            isDeleted: 'false'
        }, {
            login: 'demo-user4',
            password: 'password4',
            age: '24',
            isDeleted: 'false'
        }, {
            login: 'demo-user5',
            password: 'password5',
            age: '25',
            isDeleted: 'false'
        }]);
    },
    down: (queryInterface) => {
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
};
