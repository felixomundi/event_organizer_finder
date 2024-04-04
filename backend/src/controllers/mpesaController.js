require("dotenv").config();
const { Payment } = require("../database/models");
const MpesaService = require("../services/MpesaService");

const generateToken = async(req, res, next) => {    
   try {       
       const response = await MpesaService.generateTokenService();       
    if (response) {
        req.token = response.access_token;         
      }        
       next(); 
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
        const response = await MpesaService.stkPushService(phone, amount, req);   
        
        if(response.ResponseCode == "0"){            
            const CheckoutRequestID = response.CheckoutRequestID;
            const MerchantRequestID = response.MerchantRequestID;
            const ResponseDescription = response.ResponseDescription;
            const payment = await Payment.create({
                CheckoutRequestID,MerchantRequestID,status:'Requested'
            })
            return res.status(200).json({ CheckoutRequestID, MerchantRequestID, ResponseDescription, payment });
        }  
        
   }
       catch(error) {            
           if(error){
            return res.status(400).json(error)
           }
          
    };
}
const callBack = async(req, res) => {    
    try {
        if (req.body.Body != null) { 

        const {
            // MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = req.body.Body.stkCallback;        
        const meta = Object.values(await CallbackMetadata.Item);
        const PhoneNumber = await meta.find(o => o.Name === 'PhoneNumber').Value.toString();
        // const Amount = await meta.find(o => o.Name === 'Amount').Value.toString();
        const MpesaReceiptNumber = await meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString();
        // const TransactionDate = await meta.find(o => o.Name === 'TransactionDate').Value.toString();                  
        const payment = await Payment.findOne({ where: { CheckoutRequestID } });
        if (!payment) { }
        else {
            if (ResultCode === 0) {                
                await payment.update({
                    phone_number: PhoneNumber,
                    ResultDesc,
                    MpesaReceiptNumber,
                    status:'Paid'
                });
                console.log("Success Payment:", payment);
            } else if(ResultCode === "1032") {
                await payment.update({
                    phone_number: PhoneNumber,
                    ResultDesc:ResultDesc,
                    MpesaReceiptNumber:MpesaReceiptNumber,
                    status:'Failed'
                });
                console.log("Failed Payment:",payment);
            }
        }            

        } else {    }
            
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
        const response = await MpesaService.stkPushStatusService(CheckoutRequestID, req);

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

