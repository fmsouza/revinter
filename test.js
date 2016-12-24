const revinter = require('./index');
const expect = require('expect');

describe('revinter function', () => {

    it("should get the value 'world' for the token 'bar'", done => {
        const pattern = "hello ${bar}";
        const expression = "hello world";
        const result = revinter(expression, pattern);
        expect(result.bar).toBe('world');
        done();
    });

});