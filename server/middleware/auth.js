const jwt = require("jsonwebtoken");
const User = require("../model/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Not Found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(403).send({ error: "please Auth" });
  }
};

module.exports = auth;
