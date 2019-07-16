const sinon = require('sinon');
const chai = require('chai');

chai.should();


describe('Trip Tests', () => {
  describe('POST /trips', () => {
    it.skip('admin should be able to create a trip', () => {
    // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          token: '123',
          user_id: 1,
          is_admin: false,
          data: {

          },
        },
      };

      const res = {
        status: sinon.spy(),
        data: {
          trip_id: sinon.spy(),
          bus_id: sinon.spy(),
          origin: sinon.spy(),
          destination: sinon.spy(),
          trip_date: sinon.spy(),
          fare: sinon.spy(),
        },
      };

      res.status.calledWith(201).should.equal(true);
    });
  });

  describe('GET /trips', () => {
    it.skip('user and admin should be able to retrieve trips', () => {
      // eslint-disable-next-line no-unused-vars
      const req = {};

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      res.status.calledWith(200).should.equal(true, 'Successfully sent response');
    });
  });
});
