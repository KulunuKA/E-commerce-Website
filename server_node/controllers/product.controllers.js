const Product = require("../model/Product");

const postProduct = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.images ||
    !req.body.price ||
    !req.body.description ||
    !req.body.brand ||
    !req.body.material ||
    !req.body.weight ||
    !req.body.category ||
    !req.body.size ||
    !req.body.gender ||
    !req.body.available ||
    !req.body.stock
  ) {
    return res.status(400).send({
      data: {},
      code: 400,
      msg: "Invalid input",
    });
  }
  const addMin = new Product(req.body);
  try {
    await addMin.save();
    res.status(201).send({
      data: addMin,
      code: 201,
      msg: "Product Added",
    });
  } catch (error) {
    res.status(400).send({
      data: {},
      code: 400,
      msg: error.message,
    });
  }
};

const getProductWithQuery = async (req, res) => {
  try {
    const addMins = await Product.find({}).limit(req.query.limit);
    const rs = {
      data: addMins,
      msg: "success",
      code: 200,
    };
    res.status(200).send(rs);
  } catch (error) {
    res.status(401).send({
      data: {},
      code: 401,
      msg: error.message,
    });
  }
};

const updateAvailable = async (req, res) => {
  const _id = req.params.id;
  try {
    const updateProduct = await Product.findByIdAndUpdate(_id, req.body);

    if (updateProduct) {
      res.status(200).send({
        data: updateProduct,
        code: 200,
        msg: "Product Updated",
      });
    } else {
      res.status(404).send({
        data: {},
        code: 404,
        msg: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      code: 500,
      msg: error.message,
    });
  }
};

module.exports = {
  postProduct,
  getProductWithQuery,
  updateAvailable,
};
