let users = [];

module.exports = class User {

    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    save() {
        users.push(this);
    }

    static update() {
        let user = users.find(user => user.id == this.id)
        user.name = this.name;
        user.age = this.age;
        return user;
    }

    static getAllUsers() {
        return users;
    }

    static findUserById(id) {
        return users.find(user => user.id == id)
    }

    static findUserByIdAndRemove(id) {
        let user = users.find(user => user.id == id)
        users = users.filter(user => user.id != id);
        return user;
    }

}