const users = [
    {
        id: '1',
        login: 'b_user',
        password: 'pass1',
        age: 21,
        isDeleted: false
    },
    {
        id: '2',
        login: 'a_user',
        password: 'pass2',
        age: 22,
        isDeleted: false
    },
    {
        id: '3',
        login: 'c_user',
        password: 'pass3',
        age: 23,
        isDeleted: true
    }
];

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
        return users.find(user => user.id === id && !user.isDeleted);
    }

    static removeUser(userData) {
        return userData.isDeleted = true;
    }

    static updateUser(userData) {
        const userIndex = users.findIndex(user => user.id === userData.id);
        return users.splice(userIndex, 1, userData);
    }

    static getAutoSuggestUsers(loginSubstring, limit) {
        return users
            .filter((user) => user.login.includes(loginSubstring))
            .sort((a, b) => a.login.localeCompare(b.login))
            .slice(0, limit);
    }
};
