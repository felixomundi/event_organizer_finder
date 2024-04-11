require("dotenv").config();
const { Payment,Order } = require("../database/models");
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
        // const amount = req.body.amount;     
        if(!phone){
            return res.status(400).json({
                message:"Provide Mpesa Phone Number"
            })
        }
        // if(!amount){
        //     return res.status(400).json({
        //         message: "Provide Amount to Pay"
        //     });
        // }   
        const response = await MpesaService.stkPushService(phone, req);  
      
        return response;
        
   }
       catch(error) {            
        //    if(error.response.status >= 500){
        //     return res.status(400).json(error)
        //    }
       
        return error;

          
    };
}

const callBack = async(req, res) => {    
    try {
        console.log(req.body);       
        // const {
        //     // MerchantRequestID,
        //     CheckoutRequestID,
        //     ResultCode,
        //     ResultDesc,
        //     CallbackMetadata
        // } = req.body.Body.stkCallback;  
    

        // const meta = Object.values(await CallbackMetadata.Item);
        // const PhoneNumber = await meta.find(o => o.Name === 'PhoneNumber').Value.toString();
        // // const Amount = await meta.find(o => o.Name === 'Amount').Value.toString();
        // const MpesaReceiptNumber = await meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString();
        // // const TransactionDate = await meta.find(o => o.Name === 'TransactionDate').Value.toString();                  
        // const payment = await Payment.findOne({ where: { CheckoutRequestID } });
        // if (!payment) { }
        // else {
        //     if (ResultCode === 0) {                
        //         await payment.update({
        //             phone_number: PhoneNumber,
        //             ResultDesc,
        //             MpesaReceiptNumber,
        //             status:'Paid'
        //         });
        //         console.log("Success Payment:", payment);
        //     } else if(ResultCode === "1032") {
        //         await payment.update({
        //             phone_number: PhoneNumber,
        //             ResultDesc:ResultDesc,
        //             MpesaReceiptNumber:MpesaReceiptNumber,
        //             status:'Failed'
        //         });
        //         console.log("Failed Payment:",payment);
        //     }
        // }           

            
    } catch (error) {        
        //console.log(error);
    }
}
async function orderPayment(req,res) {
    try {
    let orderId, phone;
    phone = req.body.phone
    orderId = req.body.orderId;
    phone = phone.substring(1);
    if (!orderId) {
        return res.status(400).json({message:'Please add Order Id'}); 
    }
    if (!phone) {
        return res.status(400).json({message:'Please add a valid Mpesa Number'}); 
    }
    const order = await Order.findOne({ where: { id: orderId } });
    if (order.status === "Paid") {
        return res.status(400).json({message:'Order already paid'});
    }       
    const paymentResponse = await MpesaService.stkPushService(phone, req);       
    if (paymentResponse.ResponseCode == "0") {                  
        const CheckoutRequestID = paymentResponse.CheckoutRequestID;
        const MerchantRequestID = paymentResponse.MerchantRequestID;
        // const ResponseDescription = paymentResponse.ResponseDescription;
        const payment =
            await Payment.create({
            CheckoutRequestID, MerchantRequestID, status: 'Requested', orderId:orderId
        });  
        const payment_status = await MpesaService.paymentStatus(req,res,CheckoutRequestID);
        return  payment_status;                     
    }

    } catch (error) {
        return res.status(400).json({ message: 'Error in order payment' })
    }

}
module.exports = {
    generateToken,
    stkPush,
    callBack,
    orderPayment,
}

