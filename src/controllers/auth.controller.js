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

    const text = 'SELECT email FROM "user" WHERE email = $1';
    // eslint-disable-next-line max-len
    const values = [userData.email];

    const result = await db.query(text, values);

    const fetchEmail = result.rows[0];

    console.log(fetchEmail);

    if (fetchEmail && (fetchEmail.email === userData.email)) {
      res.status(409);
      return res.send({ status: 409, error: 'Email already exists' });
    }

    // assign default value to is_admin
    if (!userData.is_admin) userData.is_admin = false;

    // hash password
    // eslint-disable-next-line consistent-return
    bcrypt.hash(userData.password, null, null, async (err, hash) => {
      if (err) {
        res.status(500);
        return res.send({ status: 500, error: 'Error saving user' });
      }

      const insertText = 'INSERT INTO "user"(email, first_name, last_name, password, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING *';
      // eslint-disable-next-line max-len
      const insertValues = [userData.email, userData.first_name, userData.last_name, hash, userData.is_admin];

      const { rows } = await db.query(insertText, insertValues);

      if (!rows) {
        res.status(500);
        return res.send({ status: 500, error: 'Error saving user' });
      }

      req.body.id = rows[0].id;

      createSendToken(res, req.body, 201);
    });

    return 0;
  };

  const signin = async (req, res) => {
    const loginData = req.body;

    const text = 'SELECT * FROM "user" WHERE email = $1';
    const values = [loginData.email];

    const { rows } = await db.query(text, values);

    if (!rows[0]) {
      res.status(401);
      return res.send({ status: 401, error: 'Email or Password Invalid' });
    }

    const user = rows[0];
    // eslint-disable-next-line consistent-return
    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).send({ status: 401, error: 'Email or Password Invalid' });
    });

    createSendToken(res, user, 200);

    return 0;
  };

  return { signup, signin };
};

module.exports = authController;
