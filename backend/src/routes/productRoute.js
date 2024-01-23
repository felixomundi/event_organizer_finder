const express = require("express");
const  { addProduct, getProduct, getProducts, updateProduct, deleteProduct, getProductDetail, getProductsByAdmin } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const protect = require("./../middleware/authMiddleware");
const isAdmin = require("./../middleware/adminMiddleware");
const router = express.Router();

router.get("/all-products", protect, getProductsByAdmin);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/products/:id', getProductDetail);
router.post('/',[isAdmin], upload.single("image"), addProduct);
router.patch('/:id',[isAdmin], upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;

