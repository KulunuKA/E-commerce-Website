const Admin = require("../model/Admin");

const postAdmin = async (req, res) => {
  const admin = new Admin(req.body);

  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      data: {},
      msg: "Missing required filed",
      code: 400,
    });
  }

  try {
    await admin.save();
    return res.status(201).send({
      data: admin,
      msg: "Created",
      code: 201,
    });
  } catch (error) {
    return res.status(400).send({
      data: {},
      msg: error.message,
      code: 400,
    });
  }
};

const logAdmin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        data: {},
        msg: "Missing required field",
        code: 400,
      });
    }

    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );

    const { _id, email,role } = admin;
    const token = await admin.generateAuthToken();

    res.status(200).send({
      data: {
        id: _id,
        role: role,
        email: email,
        token: token,
      },
      code: 200,
      msg: "Admin logged in successfully",
    });
  } catch (error) {
    res.status(400).send({
      data: {},
      code: error.statusCode || 400,
      msg: error.message || "Login failed",
    });
  }
};

module.exports = { postAdmin, logAdmin };
