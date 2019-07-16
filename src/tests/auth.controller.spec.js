const sinon = require('sinon');
const chai = require('chai');
const db = require('../db/db');
const authController = require('../controllers/auth.controller');

chai.should();

describe('Sign up and Sign in Tests', () => {
  describe('POST /auth/signup', () => {
    let fakedb;
    before(() => {
      fakedb = sinon.stub(db);
      fakedb.query.returns({ rows: [{ email: 'esther@gmail.com' }] });
    });

    after(() => {
      fakedb.query.restore();
    });

    it('should be able to sign up new user', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          email: 'evuazeze@gmail.com',
          first_name: 'Emmanuel',
          last_name: 'Evuazeze',
          password: '123',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const bcrypt = {
        hash: sinon.spy(),
      };

      const jwt = {
        encode: sinon.stub(),
      };

      const controller = authController(fakedb, jwt, bcrypt);
      await controller.signup(req, res);

      // res.status.calledWith(500).should.equal(true);
      bcrypt.hash.called.should.equal(true);

      // fakedb.query.calledTwice.should.equal(true);
    });
  });

  describe('POST /auth/signin', () => {
    let fakedb;
    before(() => {
      fakedb = sinon.stub(db);
      fakedb.query.returns({ rows: [{ email: 'esther@gmail.com' }] });
    });

    after(() => {
      fakedb.query.restore();
    });

    it('should be able to sign in user', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          email: 'esther@gmailcom',
          password: '123',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        data: {
          user_id: sinon.spy(),
          is_admin: sinon.spy(),
          token: sinon.spy(),
        },
      };

      const bcrypt = {
        compare: sinon.spy(),
      };

      const jwt = {
        encode: sinon.stub(),
      };

      const controller = authController(fakedb, jwt, bcrypt);
      await controller.signin(req, res);

      fakedb.query.calledOnce.should.equal(true);
      res.status.calledWith(200).should.equal(true);
      res.send.calledOnce.should.equal(true);
    });
  });
});
