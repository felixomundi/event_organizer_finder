const express = require("express");
const { createOrder,
    userOrders,
    getOrder,
 
} = require("../controllers/orderController");
const router = express.Router();
const isAuthenticated = require("./../middleware/authMiddleware");
const { generateToken, orderPayment } = require("../controllers/mpesaController");
router.post("/create", isAuthenticated, createOrder);
router.get("/user/orders", isAuthenticated, userOrders);
router.get("/user/orders/findById/:id", isAuthenticated, getOrder);
router.post("/pay", generateToken, orderPayment);
module.exports = router;