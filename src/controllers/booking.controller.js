const bookingController = (db) => {
  const bookSeat = async (req, res) => {
    const tripId = req.body.trip_id;
    const busId = req.body.bus_id;
    const userId = req.body.user_id;
    const seatNo = req.body.seat_number;

    let hasErrors = false;

    if (!tripId || !busId) {
      hasErrors = true;
    }

    if (hasErrors) {
      res.status(400);
      return res.send({ status: 400, error: 'Bad Request Data' });
    }

    let text = 'SELECT user_id, trip_id FROM "booking" WHERE user_id = $1 AND trip_id = $2';
    let values = [userId, tripId];

    const checkBookStatusResult = await db.query(text, values);

    const bookingStatus = checkBookStatusResult.rows[0];

    if (bookingStatus) return res.status(409).send({ status: 409, error: 'Trip already booked by User' });

    // let text = 'SELECT id FROM "bus" WHERE id = $1';
    // let values = [busId];
    //
    // const busResult = await db.query(text, values);
    //
    // const bus = busResult.rows[0];
    //
    // if (!bus) return res.status(404).send({ status: 404, error: 'No such bus' });
    //
    // text = 'SELECT id FROM "trip" WHERE id = $1';
    // values = [tripId];
    //
    // const tripsResult = await db.query(text, values);
    //
    // const trip = tripsResult.rows[0];
    //
    // if (!trip) return res.status(404).send({ status: 404, error: 'No such trip' });

    text = 'SELECT first_name, last_name, email FROM "user" WHERE id = $1';
    values = [userId];

    const userResult = await db.query(text, values);

    const user = userResult.rows[0];

    if (!user) return res.status(500).send({ status: 500, error: 'Error Booking a Seat' });


    text = 'INSERT INTO "booking"(trip_id, user_id, created_on, seat_number) VALUES($1, $2, $3, $4) RETURNING *';
    // eslint-disable-next-line max-len
    values = [tripId, userId, new Date(), seatNo];

    const insertedBookingResult = await db.query(text, values);

    const booking = insertedBookingResult.rows[0];

    if (!booking) {
      res.status(500);
      return res.send({ status: 500, error: 'Error Booking a seat' });
    }

    const response = {
      status: 201,
      data: {
        booking_id: booking.id,
        user_id: userId,
        trip_id: tripId,
        bus_id: busId,
        trip_date: booking.created_on,
        seat_number: seatNo,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };

    res.status(200);
    return res.send({ status: 201, data: response });
  };

  return { bookSeat };
};

module.exports = bookingController;
