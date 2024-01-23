require("dotenv").config();
const axios = require("axios");
const ngrok = require("ngrok");
// const getTimestamp = require("../utils/timestamp");
// const TIMESTAMP = getTimestamp();  
// const SHORTCODE = process.env.MPESA_SHORTCODE;
// const PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
// const PASSWORD = new Buffer.from(SHORTCODE + PASSKEY + TIMESTAMP).toString("base64");    
// const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
// const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
// const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;
async function ngrokConnect(){
    try {
        var url = await ngrok.connect({
            proto: 'http', 
            addr: 5000,
            authtoken:process.env.AUTH_TOKEN,
           });
           console.log(url)
    } catch (error) {
        console.log(error);
    }

} ngrokConnect();


const generateToken = async(req, res, next) => {    
   try {       
    const auth = new Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
    const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                }
            });
        if (response.data) {
          req.token = response.data.access_token;         
        }        
      next() 
      return response.data;
    } catch (error) {
        return res.status(400).json(error);
    }
}
const stkPush = async (req, res) => {   
    try {
        const phone = req.body.phone.substring(1);
        const amount = req.body.amount;     
        if(!phone){
            return res.status(400).json({
                message:"Provide Mpesa Phone Number"
            })
        }
        if(!amount){
            return res.status(400).json({
                message:"Provide Amount to Pay"
            })
        }
        const data =  { 
        "BusinessShortCode": SHORTCODE,
        "Password": PASSWORD,
        "Timestamp": TIMESTAMP,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,
        "PartyA": `254${phone}`,
        "PartyB": SHORTCODE,
        "PhoneNumber": `254${phone}`,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": `254${phone}`,
        "TransactionDesc": "Testing mpesa simulation"
    }
    const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            data, {
            headers: {
                authorization: `Bearer ${req.token}`,
                "Content-Type": "application/json",            }
        }
        );
   
       console.log(response)
    //   return res.status(200).json(response.data.ResponseDescription);
     return  res.status(200).json(response.data)
 
   }
       catch(error) {
            console.log(error)
           return res.status(400).json(error.response.data.errorMessage)
           //error.message
    };
}
const callBack = async(req, res) => {    
    try {
        // const callBackData = req.body.Body.stkCallback;
        // console.log(callBackData);       
            // const data = callBackData.Body.stkCallback.CallbackMetadata;           
            // const amount = data.Item[0].Value;
            // const transaction = data.Item[1].Value;
            // const balance = data.Item[2].Value;
            // const date = data.Item[3].Value;        
            // const phone = data.Item[4].Value;  
            console.log(req.body)          
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const stkPushStatus = async(req, res)=>{
    try {
        const CheckoutRequestID = req.body.CheckoutRequestID
        if(!CheckoutRequestID){
            return res.status(400).json({
                message:"Please Provide CheckoutRequestID"
            })
        }
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";      
        const response = await axios.post(url,
            {
                "BusinessShortCode":SHORTCODE,
                "Password":PASSWORD,
                "Timestamp":TIMESTAMP,
                'CheckoutRequestID':CheckoutRequestID
            },
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                    "Content-Type": "application/json",            }
            }        
            );
        return response;
    } catch (error) {
        if(error){
            return error
        }
    }

}
module.exports = {
    generateToken,
    stkPush,
    callBack,
    stkPushStatus
}