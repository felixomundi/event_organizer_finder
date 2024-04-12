const express = require("express");
const { generateToken, stkPush, callBack, orderPayment } = require("./../controllers/mpesaController");
const router = express.Router();
router.get("/token", generateToken);
router.post("/stk", generateToken, stkPush);
router.post("/pay", generateToken, orderPayment);
router.post("/callback", callBack);
module.exports = router;



