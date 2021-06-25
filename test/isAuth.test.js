const expect = require('chai').expect;
const isAuth = require('../middleware/isAuth');

describe('Auth middleware', function() {
    it('should throw an error if no x-auth-token header is present', function() {
        const req = {
            header: function() {
                return null;
            }
        };
        expect(isAuth.bind(this, req, {}, () => {})).to.throw('No token, authorization denied');
    })
})
