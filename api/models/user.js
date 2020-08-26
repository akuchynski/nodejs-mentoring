let users = [
    {
        id: '1',
        login: 'user1',
        password: 'pass1',
        age: 21,
        isDeleted: false
    },
    {
        id: '2',
        login: 'user2',
        password: 'pass2',
        age: 22,
        isDeleted: false
    },
    {
        id: '3',
        login: 'user3',
        password: 'pass3',
        age: 23,
        isDeleted: true
    }
]

module.exports = class User {

    constructor(id, login, password, age, isDeleted) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }

    save() {
        users.push(this);
    }

    static getAllUsers() {
        return users.filter(user => !user.isDeleted);
    }

    static findUserById(id) {
        return users.find(user => user.id == id && !user.isDeleted);
    }

    static removeUser(userData) {
        return userData.isDeleted = true;
    }

    static updateUser(userData) {
        let userIndex = users.findIndex(user => user.id === userData.id)
        return users.splice(userIndex, 1, userData);
    }
}