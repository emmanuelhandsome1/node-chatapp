class Users {
    constructor() {
        this.users = [];
    }

    addNewUser(id, name, room) {
        var newUser = {id, name, room};
        this.users.push(newUser);

        return newUser;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        var users = this.users.filter(user => user.room === room);
        var namesArray = users.map(user => user.name);

        return namesArray;
    }
}

module.exports = {Users};