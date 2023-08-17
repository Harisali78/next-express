const productModel = require("../models/productModel");
// exports.getProducts = async (req, res) => {
//   const data = await productModel.find();
//   res.status(200).json({
//     success: true,
//     data,
//   });
// };
const createProduct = (req, res) => {
  console.log(req)
  const data = productModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    data,
  });
};
const getProducts = async (req, res) => {
  // const id = req.params.id;
  // const data = await productModel.findById(id);
  // res.status(200).json({
  //   success: true,
  //   data,
  // });
  const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const searchQuery = req.query.search || ''
    try {

        let productQuery = productModel.find()
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, 'i')
            productQuery = productQuery.where({ title: { $regex: searchRegex } })
        }

        const data = await productQuery.sort({ createdAt: -1 }).skip(skip).limit(pageSize)
        const totalProducts = await productModel.countDocuments();
        // const data = await productModel.find()
        //     .sort({ createdAt: -1 })
        //     .skip(skip)
        //     .limit(pageSize);

        // const totalProducts = await productModel.countDocuments();

        res.status(200).json({
            success: true,
            data,
            page,
            totalPages: Math.ceil(totalProducts / pageSize)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const product = await productModel.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    product,
  });
};
const deletedProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: `Product with ${id} has been deleted succesfully`,
  });
};

const authMiddleware = (req, res, next) => {
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


module.exports = {
  getProducts,
  createProduct,
  deletedProduct,
  updateProduct
}