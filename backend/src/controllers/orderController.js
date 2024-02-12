"use strict";
const { User, Cart, OrderItems, Order, Product } = require('./../database/models');
const crypto = require("crypto");
const createOrder = async (req, res) => {
    try {
        const user = await User.findOne({
            where:{id:req.user.id}
        })
        if (!user) {
            return res.status(401).json({
                message:"Unauthenticated"
            })
        }
        const userId = user.id;

        const cart = await Cart.findOne({
            where: {
                userId
            }
        });

        if (!cart) {
             return res.status(400).json({
            message: "Please add items to your cart"
        })
        }

        const cartItems = await Cart.findAll({
            where: {
                userId
            }
        })
        const { shipcode, address, payment_mode, total, coupon_code,discount, discounted_total } = (req.body);
        let tracking_no = crypto.randomUUID();
        let order = await Order.create({
            shipcode,
            address,
            payment_mode,
            total,
            coupon_code,
            status: "Order Created",
            userId,
            tracking_no,
            discount,
            discounted_total,
        });

        order = order.id; 
        cartItems.forEach(item => {            
            let product = item.productId
            let quantity = item.quantity           
             createOrderItems(product, quantity, order);    
        });
        
        await Cart.destroy({
            where: {
                userId
            }
        })

        //send email
    
        return res.status(200).json({           
            message: "Order created successfully",             
        })     
        
        
    } catch (error) {
    
        if (error) {
            return res.status(500).json({
                message:"Something went wrong in creating order"
            })
        }
    }
}
async function createOrderItems(product, quantity, order) {
   await OrderItems.bulkCreate([{productId:product, quantity, orderId:order}]);
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
                    model: Product,
                    attributes:["name"]
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
                        model: Product,
                        attributes:["name", "image", "price" ],
                    }],                    
                },
                {
                    model: User,
                    attributes:["name"],
                },
                
            ],
        })
        if (!order) {
            return res.status(404).json({
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
async function adminOrders(req,res) {
    try {
        const orders = await Order.findAll({           
            include: [{
                model: OrderItems,
                attributes:["quantity"],
                include: [ {
                    model: Product,
                    attributes:["name","price", "image"]
                },],
            },
                {
                    model: User,
                attributes:["name"]},
            ],
        })
        return res.status(200).json({
            orders
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch orders"
        })
    }
}
async function adminOrderDetail(req, res) {
    try {
        // const id = req.body.orderId;
        let id = req.params.id;        
        const order = await Order.findOne({
            where: {
                tracking_no:id,
            },
            include: [
                
                {
                    model: OrderItems,
                    attributes:["quantity"],
                    include: [{
                        model: Product,
                        attributes:["name", "image", "price" ],
                    }],                    
                },
                {
                    model: User,
                    attributes:["name"],
                },
                
            ],
        })
        if (!order) {
            return res.status(404).json({
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
module.exports = {
    createOrder,
    userOrders,
    getOrder,
    adminOrders, 
    adminOrderDetail,
}