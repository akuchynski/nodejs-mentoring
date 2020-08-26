let users = [
    {
        id: '1',
        login: 'user1',
        password: 'pass1',
        age: '21',
        isDeleted: false
    },
    {
        id: '2',
        login: 'user2',
        password: 'pass2',
        age: '22',
        isDeleted: false
    },
    {
        id: '3',
        login: 'user3',
        password: 'pass3',
        age: '23',
        isDeleted: false
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

    static update() {
        let user = users.find(user => user.id == this.id)
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
        return user;
    }

    static getAllUsers() {
        return users;
    }

    static findUserById(id) {
        return users.find(user => user.id == id);
    }

    static findUserByIdAndRemove(id) {
        let user = users.find(user => user.id == id);
        users = users.filter(user => user.id != id);
        return user;
    }

    static updateUser(userData) {
        let user = users.find(user => user.id == userData.id);
        return user;
    }

}