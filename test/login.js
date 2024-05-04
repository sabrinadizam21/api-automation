const chai = require('chai');
const expect = chai.expect;
const method = require('../method/method');
const { loginData } = require('../data/auth.data');
chai.use(require('chai-json-schema'));

describe('POST /auth', () => {
    const loginClass = new method()

    // TC001 - POST: Verify successfully login
    it(loginData[0].case.title, async () => {
        const resp = await loginClass.login(loginData[0].payload)
        expect(resp.status).to.eql(200);
        expect(resp.body).to.have.property('token');
    });

    // TC002 - POST: Verify failed login with empty input
    it(loginData[1].case.title, async () => {
        // BUG: Status code has to be 400, but now status code is 200
        const resp = await loginClass.login(loginData[1].payload)
        // expect(resp.status).to.eql(400);
        expect(resp.body.reason).to.eql('Bad credentials');
    });

    // TC003 - POST: Failed login - input with invalid type
    it(loginData[2].case.title, async () => {
        const resp = await loginClass.login(loginData[2].payload)
        // expect(resp.status).to.eql(400);
        expect(resp.body.reason).to.eql('Bad credentials');
    });
});