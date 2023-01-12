var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Admin';
        var text = 'Hello';
        var response = generateMessage(from, text);

        expect(response).toBeTruthy();
        expect(response.from).toBe(from);
        expect(response.text).toBe(text);
        expect(response.createdAt).toBeTruthy();
        expect(typeof response.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'Admin';
        var latitude = 1;
        var longitude = 2;
        var baseURL = 'https://www.google.com/maps?q=';
        var response = generateLocationMessage(from, latitude, longitude);

        expect(response).toBeTruthy();
        expect(response.from).toBe(from);
        expect(response.url).toBeTruthy();
        expect(response.url).toBe(`${baseURL}${latitude},${longitude}`);
        expect(response.createdAt).toBeTruthy();
        expect(typeof response.createdAt).toBe('number');

        expect(response).toMatchObject({
            from,
            url: `${baseURL}${latitude},${longitude}`
        });
    });
});