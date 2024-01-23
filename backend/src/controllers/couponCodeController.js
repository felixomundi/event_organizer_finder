const { Coupontype,Coupon } = require('./../database/models');

const getCouponCodes = async (req, res) => {
    try {
        const codes = await Coupon.findAll();
        return res.status(200).json({ codes })
    } catch (error) {
        return res.status(500).json({
            error:"Failed to get coupon codes",
        })
    }
}
const createCouponCode = async (req, res) => {
    try {
        const { coupon_type_Id, name, coupon_code, amount, limits, expiry,status } = req.body;
        if (!coupon_type_Id) {
            return res.status(400).json({
                message: "Code type required",                
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "Coupon code name is required",
            });
        }
        if (!coupon_code) {
            return res.status(400).json({
                message: "Coupon code is required",
            });
        }
        if (!amount) {
            return res.status(400).json({
                message: "Coupon amount is required",
            });
        }
        if (!limits) {
            return res.status(400).json({
                message: "Coupon limit is required",
            });
        }
        if (!expiry) {
            return res.status(400).json({
                message: "Coupon expiry date is required",
            });
        }
        if (!status) {
            return res.status(400).json({
                message: "Coupon status is required",
            });
        }
        const couponType = await Coupontype.findOne({
            where: {
                id: coupon_type_Id,
            }
        });
        if (!couponType) {
            return res.status(404).json({
                message: "Coupon type not found",
            });
        } 

        const code = await Coupon.findOne({
            where: {
                coupon_code
            }
        })
        if (code) {
            return res.status(400).json({
                message: "Coupon code exists",
            });
        }
        const date = new Date(expiry);        
            const newCoupon = await Coupon.create({
                name, coupon_code, coupon_type_Id, limits, expiry:date, status, amount
            });
        return res.status(200).json({
            message: "Coupon code created",
            code: newCoupon,
        });        

       
    } catch (error) {
        return res.status(500).json({
            error:"Something went wrong in getting codes",
        })
    }
}
const editCouponCode = async (req, res) => {
    
}
const deleteCouponCode = async (req, res) => {
    try {
        const { coupon_code_id } = req.body;
    if (!coupon_code_id) {
        return res.status(400).json({
            message:"coupon_code_id is required",
        })
    }
    const code = await Coupon.findOne({
        where: {
            id:coupon_code_id,
        }
    })
    if (!code) {
        return res.status(404).json({
            message:"Coupon code not found",
        })
        }
        await code.destroy();
        return res.status(200).json({
            message:"Coupon code deleted",
        })
    } catch (error) {
        return res.status(500).json({
            error:"Something went wrong",
        })
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
        if (!cartTotal) {
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
    createCouponCode,
    getCouponCodes,
    editCouponCode,
    deleteCouponCode,
    applyCouponCode,
}