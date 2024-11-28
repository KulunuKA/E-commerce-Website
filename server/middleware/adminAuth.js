const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!admin) {
      throw new Error("Not Found");
    }

    req.admin = admin;

    next();
  } catch (error) {
    res.status(401).send({ error: "please Auth" });
  }
};

module.exports = adminAuth;
