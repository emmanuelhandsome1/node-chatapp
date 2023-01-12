const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var response  = isRealString(98);
        expect(response).toBe(false);
    });

    it('should reject strings with just spaces', () => {
        var response  = isRealString('      ');
        expect(response).toBe(false);
    });

    it('should accept valid strings', () => {
        var response  = isRealString(' Hello     ');
        expect(response).toBe(true);
    });
});