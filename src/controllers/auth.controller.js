const authController = (db, jwt, bcrypt) => {
  const validEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const createSendToken = (res, userData, statusCode) => {
    const payload = { sub: userData.id };

    // get payload secret from a configuration file.
    const token = jwt.encode(payload, process.env.PAYLOAD_SECRET);

    const response = {
      status: statusCode,
      data: {
        user_id: userData.id,
        is_admin: userData.is_admin,
        token,
      },
    };

    res.status(statusCode);
    return res.send(response);
  };

  const signup = async (req, res) => {
    const userData = req.body;

    // validate request data
    let hasErrors = false;

    if (!userData.email || !validEmail(userData.email) || !userData.first_name
      || !userData.last_name || !userData.password) {
      hasErrors = true;
    }

    if (hasErrors) {
      res.status(400);
      return res.send({ status: 400, error: 'Bad Request Data' });
    }

    let text = 'SELECT email FROM "user" WHERE email = $1';
    let values = [userData.email];
    let result;

    result = await db.query(text, values);

    const user = result.rows[0];

    if (user.email === userData.email) {
      res.status(409);
      return res.send({ status: 409, error: 'This email already exists' });
    }

    // assign default value to is_admin
    if (!userData.is_admin) userData.is_admin = false;

    // hash password
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (!err) {
        userData.password = hash;
      }
    });

    text = 'INSERT INTO "user"(email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
    // eslint-disable-next-line max-len
    values = [userData.email, userData.first_name, userData.last_name, userData.password, userData.is_admin];

    result = await db.query(text, values);

    const insertedUser = result.rows[0];

    if (!insertedUser) {
      res.status(500);
      return res.send({ status: 500, error: 'Error saving user' });
    }

    req.body.id = insertedUser.id;

    return createSendToken(res, req.body, 201);
  };

  return { signup };
};

module.exports = authController;
