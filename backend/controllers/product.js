const productModel = require("../models/productModel");
exports.getProducts = async (req, res) => {
  const data = await productModel.find();
  res.status(200).json({
    success: true,
    data,
  });
};
exports.createProduct = (req, res) => {
  console.log(req)
  const data = productModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    data,
  });
};
exports.productDetails = async (req, res) => {
  const id = req.params.id;
  const data = await productModel.findById(id);
  res.status(200).json({
    success: true,
    data,
  });
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const product = await productModel.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    product,
  });
};
exports.deletedProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: `Product with ${id} has been deleted succesfully`,
  });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

