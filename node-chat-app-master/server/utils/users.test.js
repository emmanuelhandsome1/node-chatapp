const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
    
        users.users = [
            {
                id: 1,
                name: 'Melas',
                room: 'Olotusquare' 
            },
            {
                id: 2,
                name: 'Mike',
                room: 'Broaddrive' 
            },
            {
                id: 3,
                name: 'Evans',
                room: 'Olotusquare' 
            }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 1234,
            name: "Melas",
            room: "Olotusquare"
        };

        var resUser = users.addNewUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user).toBeTruthy();
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = 99;
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = 2;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = 99;
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for Olotusquare', () => {
        var userList = users.getUserList('Olotusquare');
        expect(userList).toEqual(['Melas', 'Evans']);
    });

    it('should return names for Broaddrive', () => {
        var userList = users.getUserList('Broaddrive');
        expect(userList).toEqual(['Mike']);
    });
});