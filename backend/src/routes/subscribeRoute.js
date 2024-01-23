const express = require("express");
const { newSubscribe,getSubscribers,deleteSubscriber,unSubscribe,createOrUpdateSubscription,getSubscriber,deleteMySubscription } = require("../controllers/subscribersController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
router.post("/create", newSubscribe);
router.get("/", isAdmin, getSubscribers);
router.post("/delete", isAdmin, deleteSubscriber);
router.post("/deleteMySubscription", protect, deleteMySubscription);
router.post("/unsubscribe", [isAdmin, protect], unSubscribe);
router.post("/createorupdate", protect, createOrUpdateSubscription);
router.get("/getsubscriber", protect, getSubscriber);

module.exports = router;