require("dotenv").config();
const getTimestamp = require("../utils/timestamp");
const axios = require("axios");
const TIMESTAMP = getTimestamp();  
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const PASSWORD = new Buffer.from(SHORTCODE + PASSKEY + TIMESTAMP).toString("base64");    
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;
const { Order, Payment } = require("../database/models");
class MpesaService {
    static async stkPushService(phone, req){
        const data =  { 
            "BusinessShortCode": SHORTCODE,
            "Password": PASSWORD,
            "Timestamp": TIMESTAMP,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 1,
            "PartyA": `254${phone}`,
            "PartyB": SHORTCODE,
            "PhoneNumber": `254${phone}`,
            // "CallBackURL": CALLBACK_URL,
            "CallBackURL": "https://1410-41-222-13-182.ngrok-free.app/api/v1/payments/callback",
            "AccountReference": `254${phone}`,
            "TransactionDesc": "Testing mpesa simulation"
        }
        const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                data, {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                    "Content-Type": "application/json",            }
            }
            );
        return  response.data;
    }
    static async generateTokenService(){
        const auth = new Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
                {
                    headers: {
                        Authorization: `Basic ${auth}`,
                    }
                });    
        return response.data;
    }   
    static async paymentStatus(req,res,CheckoutRequestID) {
        try {          
            let stopTime = new Date().getTime() + 25000;
            let interval;
                interval = setInterval(async function () {
                let now = new Date().getTime();
                if (now > stopTime) {
                    clearInterval(interval);                    
                    return res.status(200).json({
                        message:'Payment Time Erapsed'
                    })
                }
                try {
                const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
                const paymentResponse = await axios.post(url,
                {
                "BusinessShortCode": SHORTCODE,
                "Password": PASSWORD,
                "Timestamp": TIMESTAMP,
                'CheckoutRequestID': CheckoutRequestID
                },
                {  headers: {
                        Authorization: `Bearer ${req.token}`,
                        "Content-Type": "application/json",
                    }
                },
                );   
                   if(await paymentResponse.data.errorCode){}
                   else if(await paymentResponse.data.ResultCode && await paymentResponse.data.ResultCode == 0) {
                       clearInterval(interval);
                       let payment = await Payment.findOne({ where: { CheckoutRequestID } });
                        if (payment) {
                            const orderId = await payment.orderId;
                            let order = await Order.findOne({ where: { id: orderId } });
                            if (order) {
                            await order.update({
                                    status: 'Paid'
                                });
                            }
                            await payment.update({
                                status: 'Paid'
                            });
                        }
                    return res.status(200).json({message: await paymentResponse.data.ResultDesc});
                   }
                   else if ( await paymentResponse.data.ResultCode && await paymentResponse.data.ResultCode != 0) {
                       clearInterval(interval);
                       let payment = await Payment.findOne({ where: { CheckoutRequestID } });
                        if (payment) {
                            const orderId = await payment.orderId;
                            let order = await Order.findOne({ where: { id: orderId } });
                            if (order) {
                            await order.update({
                                    status: 'Failed'
                                });
                            }
                            await payment.update({
                                status: 'Failed'
                            });
                        }
                    return res.status(200).json({message:await paymentResponse.data.ResultDesc});                        
                   }
                  return paymentResponse;
               } catch (error) {                   
                
              }
                }, 2000);            

           
        } catch (error) {
            
        }
    }   
}
module.exports = MpesaService