const sinon = require('sinon');
const chai = require('chai');
const db = require('../db/db');
const authController = require('../controllers/auth.controller');

chai.should();

describe('Sign up and Sign in Tests', () => {
  describe('POST /auth/signup', () => {
    it.only('should be able to sign up new user', async () => {
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

      const fakedb = sinon.stub(db);
      fakedb.query.returns({ rows: [{ email: 'esther@gmail.com' }] });

      const bcrypt = {
        hash: sinon.spy(),
      };

      const jwt = {
        encode: sinon.stub(),
      };

      const controller = authController(fakedb, jwt, bcrypt);
      await controller.signup(req, res);

      res.status.calledWith(201).should.equal(true);
      fakedb.query.calledTwice.should.equal(true);
    });
  });

  describe('POST /auth/signin', () => {
    it('should be able to sign in user', () => {
      // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          email: 'evuazeze@gmailcom',
          password: '123',
        },
      };

      const res = {
        status: sinon.spy(),
        data: {
          user_id: sinon.spy(),
          is_admin: sinon.spy(),
          token: sinon.spy(),
        },
      };

      res.status.calledWith(200).should.equal(true);
      res.send.calledOnce.should.equal(true);
    });
  });
});
