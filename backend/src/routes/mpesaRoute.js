const express = require("express");
const { generateToken, stkPush, callBack, stkPushStatus } = require("./../controllers/mpesaController");
const router = express.Router();
router.get("/token", generateToken);
router.post("/stk", generateToken, stkPush);
router.post("/callback", callBack);
router.post("/payment_status", generateToken, stkPushStatus);
module.exports = router;