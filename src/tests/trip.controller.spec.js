const sinon = require('sinon');
const chai = require('chai');
const db = require('../db/db');
const tripController = require('../controllers/trip.controller');

chai.should();


describe('Trip Tests', () => {
  describe('POST /trips', () => {
    let fakedb;
    before(() => {
      fakedb = sinon.stub(db);
      fakedb.query.returns({ rows: [{ email: 'esther@gmail.com' }] });
    });

    it('admin should be able to create a trip', async () => {
      const req = {
        body: {
          is_admin: true,
          data: {
            bus_id: sinon.spy(),
            origin: sinon.spy(),
            destination: sinon.spy(),
            trip_date: sinon.spy(),
            fare: sinon.spy(),
          },
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const controller = tripController(fakedb);
      await controller.postTrip(req, res);

      fakedb.query.calledTwice.should.equal(true);
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
