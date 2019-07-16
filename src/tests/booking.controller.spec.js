const sinon = require('sinon');
const chai = require('chai');

const db = require('../db/db');
const bookingController = require('../controllers/booking.controller');

chai.should();

describe('Booking Tests', () => {
  describe('POST /bookings', () => {
    let fakedb;
    before(() => {
      fakedb = sinon.stub(db);
      fakedb.query.returns({ rows: [{ user_id: 2, trip_id: 1 }] });
    });

    after(() => {
      fakedb.query.restore();
    });

    it('should return 409 if user already booked', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          trip_id: 2,
          user_id: 2,
          bus_id: 2,
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const controller = bookingController(fakedb);
      await controller.bookSeat(req, res);

      res.status.calledWith(409).should.equal(true);
    });
  });

  describe('GET /bookings', () => {
    it.skip('user should be able to see her bookings and admin see all bookings', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {};

      const res = {
        token: 'hrgfe',
        user_id: 12,
        is_admin: false,
      };

      res.status.calledWith(200).should.equal(true);
    });
  });

  describe('DELETE /bookings/:bookingId', () => {
    it.skip('user admin should be able to delete their booking', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {};

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      res.status.calledWith(200).should.equal(true);
    });
  });
});
