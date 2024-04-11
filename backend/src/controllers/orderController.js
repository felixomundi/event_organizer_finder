"use strict";
const { Sequelize } = require('sequelize');
const { User, Ticket, OrderItems, Order,Event,Payment  } = require('./../database/models');
const crypto = require("crypto");
const { stkPush, generateToken } = require('./mpesaController');
const MpesaService = require('../services/MpesaService');
const { Axios } = require('axios');
// async function createOrder(req, res){
//     try {
        
//         //check if phone number available
//         const phone = req.body.phone.substring(1);
//         if(!phone){
//             return res.status(400).json({
//                 message:"Provide Mpesa Phone Number"
//             })
//         }

//         const userId = req.user.id;
//         const cart = await Ticket.findOne({
//             where: {
//                 userId
//             }
//         });
//         if (!cart) {
//              return res.status(400).json({
//             message: "Please add items to your cart"
//         })
//         }



//         const cartItems = await Ticket.findAll({
//             where: {
//                 userId
//             }
//         })
//         let total = await orderTotal(req);
//         const {  payment_mode } = (req.body);
//         let tracking_no = crypto.randomUUID();
//         const order = await Order.create({
//             payment_mode,
//             total,
//             status: "Order Created",
//             userId,
//             tracking_no,
//         });

//         const orderId = await order.id;
//         cartItems.forEach(item => {
//             let eventId = item.eventId
//             let quantity = item.quantity
//              createOrderItems(eventId, quantity, orderId);
//         });
//         await Ticket.destroy({
//             where: {
//                 userId
//             }
//         })

//         //send email

//         const fetchOrder = await Order.findOne({
//             where: { id: order.id, userId },
//             include: [
//                 {
//                     model: OrderItems,
//                     attributes:["quantity"],
//                     include: [{
//                         model: Event,
//                         attributes:["event_name", "image", "entry_fee" ],
//                     }],
//                 },
//                 {
//                     model: User,
//                     attributes:["name"],
//                 },
                
//             ],
            
//         })
        
//         return res.status(200).json({
//             message: "Order created successfully",
//             order:fetchOrder
//         })
      
//     } catch (error) {
//         if (error) {
//             return res.status(500).json({
//                 message:"Something went wrong in creating order"
//             })
//         }
//     }
// }
async function createOrder(req, res){
    try {   
        
        //check if phone number available
        let phone = req.body.phone;            
        if(!phone){
            return res.status(400).json({
                message:"Provide Mpesa Phone Number"
            })
        }
        const userId = req.user.id;
        const cart = await Ticket.findOne({
            where: {
                userId
            }
        });
        if (!cart) {
             return res.status(400).json({
            message: "Please add items to your cart"
        })
        }
        const cartItems = await Ticket.findAll({
            where: {
                userId
            }
        });
        let total = await orderTotal(req);        
         const {  payment_mode } = (req.body);
        let tracking_no = crypto.randomUUID();
        const order = await Order.create({           
            payment_mode,
            total,            
            status: "Order Created",
            userId,
            tracking_no,            
        });
        const orderId = await order.id; 
        phone = phone.substring(1);
        const paymentResponse = await MpesaService.stkPushService(phone, req);       
        if(paymentResponse.ResponseCode == "0"){            
            const CheckoutRequestID = paymentResponse.CheckoutRequestID;
            const MerchantRequestID = paymentResponse.MerchantRequestID;
            // const ResponseDescription = paymentResponse.ResponseDescription;
          const payment =  await Payment.create({
                CheckoutRequestID, MerchantRequestID, status: 'Requested', orderId
          });            
            
        const payment_status = await MpesaService.paymentStatus(CheckoutRequestID,req,res);
        return payment_status;   




        // if(await payment_status_Response.data.errorCode){}
        //         else if(await payment_status_Response.data.ResultCode && await payment_status_Response.data.ResultCode == 0) {
        //     //success   
        //     clearInterval(interval);
        //     cartItems.forEach(item => {
        //         let eventId = item.eventId; let quantity = item.quantity;
        //             createOrderItems(eventId, quantity, orderId);
        //     });
        //     // clear cart
        //     await Ticket.destroy({ where: { userId } });
        //         return res.status(200).json({message: await payment_status_Response.data.ResultDesc});
        //         }
        //         else if ( await payment_status_Response.data.ResultCode && await payment_status_Response.data.ResultCode != 0) {
        //     // failed 
        //     clearInterval(interval);
        //     await order.destroy();
        //         return res.status(200).json({message:await payment_status_Response.data.ResultDesc});                        
        //         }
        // return payment_status_Response;            
        }        
      
    } catch (error) {   
        if (error) {
            return res.status(500).json({
                error:error.response,
                message:"Something went wrong in creating order"
            })
        }
    }
}
async function createOrderItems(eventId, quantity, orderId) {
   await OrderItems.bulkCreate([{eventId, quantity, orderId}]);
}
async function userOrders(req,res) {
    try {
        const orders = await Order.findAll({
            where: {
                userId:req.user.id
            },
            include: [{
                model: OrderItems,
                attributes:["quantity"],
                include: [ {
                    model: Event,
                    attributes:["event_name", "entry_fee", "image"]
                },],
            }],
        })
        return res.status(200).json({
            orders
        })
        
    } catch (error) {      
        return res.status(500).json({
            message:"Failed to fetch orders"
        })
    }
}
async function getOrder(req, res) {    
    try {
        // const id = req.body.orderId;
        let id = req.params.id;
        if (!id) {
        return res.status(400).json({
            message:"Please add orderId"
        })
        }
        const order = await Order.findOne({
            where: {
                userId:req.user.id, tracking_no:id,
            },
            include: [
                
                {
                    model: OrderItems,
                    attributes:["quantity"],
                    include: [{
                        model: Event,
                        attributes:["event_name", "image", "entry_fee" ],
                    }],                    
                },
                {
                    model: User,
                    attributes:["name"],
                },
                
            ],
        })
        if (!order) {
            return res.status(400).json({
                message:"Order Not Found"
             }) 
        }
        return res.status(200).json({
           order
        })
    } catch (error) {    
        return res.status(500).json({
            message:"Failed to fetch order"
        })
    }
}
async function orderTotal(req) {
    try {
        const cart = await Ticket.findAll({
            where: { userId: req.user.id },
            attributes: [               
                [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("total"), 'integer')),"total"], 
            ],
            raw: true,
        });
      
        let total = 0;
        for (const obj of cart) {
            const values = Object.values(obj);
            total = values[0];            
        }
        total = Number(total).toFixed(2);
        return total
    } catch (error) {
        
    }
    
} 




// async function adminOrders(req,res) {
//     try {
//         const orders = await Order.findAll({           
//             include: [{
//                 model: OrderItems,
//                 attributes:["quantity"],
//                 include: [ {
//                     model: Product,
//                     attributes:["name","price", "image"]
//                 },],
//             },
//                 {
//                     model: User,
//                 attributes:["name"]},
//             ],
//         })
//         return res.status(200).json({
//             orders
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             message: "Failed to fetch orders"
//         })
//     }
// }
// async function adminOrderDetail(req, res) {
//     try {
//         // const id = req.body.orderId;
//         let id = req.params.id;        
//         const order = await Order.findOne({
//             where: {
//                 tracking_no:id,
//             },
//             include: [
                
//                 {
//                     model: OrderItems,
//                     attributes:["quantity"],
//                     include: [{
//                         model: Product,
//                         attributes:["name", "image", "price" ],
//                     }],                    
//                 },
//                 {
//                     model: User,
//                     attributes:["name"],
//                 },
                
//             ],
//         })
//         if (!order) {
//             return res.status(404).json({
//                 message:"Order Not Found"
//              }) 
//         }
//         return res.status(200).json({
//            order
//         })
//     } catch (error) {    
//         return res.status(500).json({
//             message:"Failed to fetch order"
//         })
//     }
// }
module.exports = {
    createOrder,
    userOrders,
    getOrder,
    // adminOrders, 
    // adminOrderDetail,
}