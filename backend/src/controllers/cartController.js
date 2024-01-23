const { Cart, Product, User, Coupon, Coupontype } = require('./../database/models');
const { Sequelize } = require('sequelize');
// fetch user cart
const getCart = async (req, res) => {
    try {
        // return res.status(200).json(req.user.id);
        const cart = await Cart.findAll({
            where: { userId: req.user.id },
            include: [{
                model: User,
                attributes: ["name"],
            
            },
            {
                model: Product,
                attributes: ["name", "image", "price", "id"],
                required: true,
            },
            ],
        });    
       
        return res.status(200).send(cart);         
    } catch (error) {
        if (error) {
            return res.status(500).json(error);
        }
    }
} 
// add to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Please product and quantity is a required field",
                status:400,
            });
        }
        // check if product exist
        const item = await Product.findOne({where:{ id: productId }});
        if (!item) {
            return res.status(404).json({
                "status": 404,
                "message":"Product not found"
            });
            
        }        
        const price = item.price;
        const $quantity = Number(quantity);
        const max = item.quantity;
        

        // check user cart
        const cart = await Cart.findOne({ where: { userId: req.user.id, productId:productId } });
        if (cart) {            
            if (max < 1) {
                await cart.destroy();
                return res.status(400).json({
                "status": 400,
                "message": 'Product is out of stock',               

                });
            }
            const oldquantity = cart.quantity;
            if (max > oldquantity) {
                let total = cart.total;
                let newquantity = Number(oldquantity) + $quantity;
                total = newquantity * price;
                    const updated = await cart.update({
                            total:total,
                            quantity:newquantity,
                        });            
                        return res.status(200).json({
                            "status": 200,
                            "message": 'Product quantity updated',               
                            "cart":updated,                
                    });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: `Only ${max} available`,               
                                  
            });
            }
            
        }
        else {
           //no cart exists, create one
            if (max < 1) {
                return res.status(400).json({
                    "status": 400,
                    "message": 'Product is out of stock',                     
            });
            }  
            if ($quantity > max) {
                return res.status(400).json({
                    message: `Only ${max} available`,
                    status:400,
                });
            }
            const newCart = await Cart.create({
                userId:req.user.id,            
                productId,
                quantity,
                price,
                total: $quantity * price,
            });
                return res.status(201).json({
                    "cart":newCart,
                    message: "Product added to cart",
            });       
        }        
    } catch (error) {        
        return res.status(500).json({
            status:500,
            message:"Something went wrong in adding items to cart",
        });        
    }
}
// delete cart item functionality
const deleteCartItem = async (req, res) => {   
    try {
        const cartId = req.body.cartId;  
        if (!cartId) {
            return res.status(400).json({
                "message": "No Cart Item Selected",
                "status":400,
            }); 
        }
        else {            
        
            const cart = await Cart.findOne({where:{id: cartId, userId:req.user.id}});
        if (cart) {
            await cart.destroy();
            return res.status(200).json({
                "message": "Cart Item Deleted",
                "status":200,
            }); 
        } else {
            return res.status(404).json({
                "message": "Cart Item Not Found",
                "status":404,
            });     
        }
        } 
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: "Something went wrong When deleting",
            });            
        }
        
    }
    
}
// cart total
const cartTotal = async (req, res) => {
    try {
        const cart = await Cart.findAll({
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

        return res.status(200).json({total});
        
    } catch (error) {
       console.log(error)
    }
}
//totalItems
const totalItems = async (req, res) => {
    try {
        let total = 0;
        const cart = await Cart.findAll({ where: { userId: req.user.id } });       
        total = cart.length;    
        return res.status(200).json(total);
    } catch (error) {
        console.log(error);
    }
    
}
const clearCart = async(req, res) => {
   try {
     await Cart.destroy({ where: { userId: req.user.id } });
       return res.status(200).json({           
           message:"Cart Cleared",
          })
      
   } catch (error) {
       return res.status(500).json({
           message:"Something went wrong",
       })  
   }
}
const incrementCartItem = async (req, res) => {
    try {
    const productId = req.body.productId;    
    const userId = req.user.id;
    if (!productId) {
        return res.status(400).json({
            message: "Product Id is required",
            status:400,
        })
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return res.status(404).json({
            status: 404,
            message: "Product Not Found",
        });
    }
    const cart = await Cart.findOne({
        where: { userId, productId }
    });
    if (!cart) {
        return res.status(404).json({
            status: 404,
            message: "CartItem Not Found",
        });
    }
    const max = product.quantity;
    const oldquantity = cart.quantity;
    if (max<1 ) {
        await cart.destroy();     
        return res.status(200).json(
            { "status": 200,
                 "message": 'CartItem item deleted',
             } 
         );
    }
    if (max > oldquantity) {
        let total = cart.total;
        let newquantity = Number(oldquantity) + 1;
        total = newquantity * cart.price;
            const updated = await cart.update({
                    total,
                    quantity:newquantity,
                });            
                return res.status(200).json({
                    "status": 200,
                    "message": 'Product quantity updated',               
                    "cart":updated,                
            });
    } else {
        return res.status(200).json({
            "status": 200,
            "message": `Only ${max} Available`,               
    });
    }
   } catch (error) {
    return res.status(500).json({
        message: "Something went wrong"
    })
   }
    
}
const decrementCartItem = async (req, res) => {
    try {
        const productId = req.body.productId;
    const userId = req.user.id;
    if (!productId) {
        return res.status(400).json({
            message: "Product Id is required",
            status:400,
        })
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return res.status(404).json({
            status: 404,
            message: "Product Not Found",
        });
    }
    const cart = await Cart.findOne({
        where: { userId, productId }
    });
    if (!cart) {
        return res.status(404).json({
            status: 404,
            message: "CartItem Not Found",
        });
    }
    const max = product.quantity;
    const oldquantity = cart.quantity;
    if (max < 1 ) {
        await cart.destroy();  
        return res.status(200).json(
            { "status": 200,
                 "message": 'CartItem item deleted',
             } 
         );
    }
    if (oldquantity > 1) {
        let total = cart.total;
        let newquantity = Number(oldquantity) - 1;
        total = newquantity * cart.price;
            const updated = await cart.update({
                    total,
                    quantity:newquantity,
                });            
                return res.status(200).json({
                    "status": 200,
                    "message": 'Product quantity updated',               
                    "cart":updated,                
            });
    } else {
        await cart.destroy();
        return res.status(200).json(
           { "status": 200,
                "message": 'CartItem item deleted',
            } 
        );
    } 
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

/**
 * @admin routes
 * @method get
 * @access private
 * @return
 * 
 * **/ 
const getUserCartItems = async (req, res) => {
    try {
        const carts = await Cart.findAll({
            include: [{
                model: User,
                attributes:["name", "email"],
            }, {
                model: Product,
                attributes:["name", "image","price"]
            },
            ]
        });
        return res.status(200).json({
            carts,
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

const deleteCartItemByAdmin = async (req, res) => {   
    try {
        const cartId = req.body.cartId;  
        if (!cartId) {
            return res.status(400).json({
                "message": "No Cart Item Selected",                
            }); 
        }
        else {            
        
            const cart = await Cart.findOne({where:{id: cartId}});
        if (cart) {
            await cart.destroy();
            return res.status(200).json({
                "message": "Cart Item Deleted",
                "status":200,
            }); 
        } else {
            return res.status(404).json({
                "message": "Cart Item Not Found",
                "status":404,
            });     
        }
        } 
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: error.message,
            });            
        }
        
    }
    
}

const applyCouponCode = async (req, res) => {
    try {
        const { coupon_code, cartTotal } = req.body;
        if (!coupon_code) {
            return res.status(400).json({
                message:"Enter Coupon code"
            })
        }
        if (!cartTotal || cartTotal === "0") {
            return res.status(400).json({
                message:"Please add items to your cart"
            })
        }

        const validateCode = await Coupon.findOne({
            where: {
               coupon_code:coupon_code, status:"Active"
            }
        })
        if (!validateCode) {
            return res.status(404).json({
                message:"Invalid Coupon Code"
            })
        }
        
        const { amount, coupon_type_Id } = validateCode;
        const coupontype = await Coupontype.findOne({
            where: {
                id:coupon_type_Id
            }
        })
        if (!coupontype) {
            return res.status(404).json({
                message:"Coupon type not found"
            })
        }
        let name = coupontype.coupon_type_name
        let total = 0;
        let discount;
        if (name === "Percentage") {
             discount = cartTotal * (amount/100);
            total = cartTotal - discount;
            total = Number(total).toFixed(2);    
        }
        if (name === "Amount") {     
            discount = amount;
            total = cartTotal - discount;
            total = Number(total).toFixed(2);           
        }
        discount = Number(discount).toFixed(2);
        return res.status(200).json({
            total, discount
        })       

    } catch (error) {
        return res.status(200).json({
           error:"Something went wrong",
       })
    }
}

module.exports = {
    getCart,
    addToCart,
    deleteCartItem,
    cartTotal,
    totalItems,
    clearCart,
    incrementCartItem,
    decrementCartItem,
    getUserCartItems,
    deleteCartItemByAdmin,
    applyCouponCode,
}

