const sinon = require('sinon');
const chai = require('chai');

chai.should();

describe('Booking Tests', () => {
  describe('POST /bookings', () => {
    it('user should be able to book a seat on a trip', async () => {
      // eslint-disable-next-line no-unused-vars
      const req = {
        body: {
          token: 'wert',
          user_id: 12,
          is_admin: false,
          trip_id: 2,
          bus_id: 1,
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      res.status.calledWith(201).should.equal(true);
    });
  });

  describe('GET /bookings', () => {
    it('user should be able to see her bookings and admin see all bookings', async () => {
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
    it('user admin should be able to delete their booking', async () => {
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
