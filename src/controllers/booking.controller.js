const bookingController = (db) => {
  const bookSeat = async (req, res) => {
    return res.status(200).send('got to the end');
    const tripId = req.body.trip_id;
    const busId = req.body.bus_id;

    let hasErrors = false;

    if (!tripId || !busId) {
      hasErrors = true;
    }

    if (hasErrors) {
      res.status(400);
      return res.send({ status: 400, error: 'Bad Request Data' });
    }



    // if (!Object.prototype.hasOwnProperty.call(tripData, 'status')) {
    //   tripData.status = 1;
    // }
    //
    // let text = 'SELECT id FROM "bus" WHERE id = $1';
    // let values = [tripData.bus_id];
    // let result;
    //
    // result = await db.query(text, values);
    //
    // const busRows = result.rows;
    //
    // if (!busRows[0]) return res.status(404).send({ status: 404, error: 'Bus does not exist' });
    //
    // text = 'INSERT INTO "trip"(bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    // // eslint-disable-next-line max-len
    // values = [tripData.bus_id, tripData.origin, tripData.destination, new Date(tripData.trip_date), tripData.fare, tripData.status];
    //
    // result = await db.query(text, values);
    //
    // const tripRows = result.rows;
    //
    // if (!tripRows) {
    //   res.status(500);
    //   return res.send({ status: 500, error: 'Error saving trip' });
    // }
    //
    // const savedTrip = tripRows[0];
    //
    // const response = {
    //   status: 201,
    //   data: {
    //     trip_id: savedTrip.id,
    //     bus_id: savedTrip.bus_id,
    //     origin: savedTrip.origin,
    //     destination: savedTrip.destination,
    //     trip_date: savedTrip.trip_date,
    //     fare: savedTrip.fare,
    //     status: savedTrip.status,
    //   },
    // };
    //
    // res.status(201);
    // return res.send(response);
  };

  return { bookSeat };
};

module.exports = bookingController;
