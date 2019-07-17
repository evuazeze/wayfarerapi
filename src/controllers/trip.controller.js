const tripController = (db) => {
  const postTrip = async (req, res) => {
    // if (req.body.is_admin === false) {
    //   res.status(401);
    //   return res.send({ status: 401, error: 'Unauthorize. Not an Admin' });
    // }

    const tripData = req.body.data;

    // let hasErrors = false;
    //
    // if (!tripData.bus_id || !tripData.origin
    //   || !tripData.destination || !tripData.trip_date || !tripData.fare) {
    //   hasErrors = true;
    // }
    //
    // if (hasErrors) {
    //   res.status(400);
    //   return res.send({ status: 400, error: 'Bad Request Data' });
    // }

    // if (!Object.prototype.hasOwnProperty.call(tripData, 'status')) {
    //   tripData.status = 1;
    // }

    // let text = 'SELECT id FROM "bus" WHERE id = $1';
    // let values = [tripData.bus_id];
    // let result;
    //
    // result = await db.query(text, values);
    //
    // const busRows = result.rows;
    //
    // if (!busRows[0]) return res.status(404).send({ status: 404, error: 'Bus does not exist' });

    const text = 'INSERT INTO "trip"(bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    // eslint-disable-next-line max-len
    const values = [tripData.bus_id, tripData.origin, tripData.destination, new Date(tripData.trip_date), tripData.fare, tripData.status];

    const result = await db.query(text, values);

    const tripRows = result.rows;

    if (!tripRows) {
      res.status(500);
      return res.send({ status: 500, error: 'Error saving trip' });
    }

    const savedTrip = tripRows[0];

    const response = {
      status: 201,
      data: {
        trip_id: savedTrip.id,
        bus_id: savedTrip.bus_id,
        origin: savedTrip.origin,
        destination: savedTrip.destination,
        trip_date: savedTrip.trip_date,
        fare: savedTrip.fare,
        status: savedTrip.status,
      },
    };

    res.status(201);
    return res.send(response);
  };

  // const getTrips = async (req, res) => {
  //   const { rows } = await db.query('SELECT * FROM "trip"', []);
  //
  //   if (!rows) {
  //     res.status(400);
  //     res.send({ message: 'Error getting trips' });
  //   }
  //
  //   // eslint-disable-next-line camelcase
  //   const reshapedRows = rows.map(({ id: trip_id, ...rest }) => ({ trip_id, ...rest }));
  //
  //   res.status(200);
  //   return res.send({ status: 200, data: reshapedRows });
  // };

  return { postTrip/*, getTrips*/ };
};

module.exports = tripController;
