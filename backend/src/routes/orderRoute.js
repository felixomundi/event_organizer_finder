const express = require("express");
const { createOrder,
    userOrders,
       getOrder,
    // adminOrders, adminOrderDetail
} = require("../controllers/orderController");
const router = express.Router();
const isAuthenticated = require("./../middleware/authMiddleware");
const isAdmin = require("./../middleware/adminMiddleware");
const { generateToken } = require("../controllers/mpesaController");
router.post("/create", isAuthenticated, generateToken, createOrder);
router.get("/user/orders", isAuthenticated, userOrders);
router.get("/user/orders/findById/:id", isAuthenticated, getOrder);
// router.get("/admin/orders", isAdmin, adminOrders);
// router.get("/admin/orders/findById/:id",isAdmin, adminOrderDetail);
module.exports = router;