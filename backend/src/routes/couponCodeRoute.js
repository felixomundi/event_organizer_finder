const express = require("express");
const { getCouponCodes, createCouponCode, deleteCouponCode, applyCouponCode } = require("../controllers/couponCodeController");
const protect = require("./../middleware/authMiddleware")
const router = express.Router();
router.get("/", getCouponCodes);
router.post("/create", createCouponCode);
router.post("/delete", deleteCouponCode);
router.post("/applycode", protect, applyCouponCode);
module.exports = router;