const { Coupontype, Coupon } =  require('./../database/models');
const getCouponTypes = async (req, res) => {
    try {
        const coupons = await Coupontype.findAll({
            attributes:["id", "coupon_type_name","createdAt"]
        });
        return res.status(200).json({
           coupons,
        })
    } catch (error) {
        return res.status(500).json({
            error: "Unable to fetch coupons",
        })
    }
}
const createCouponType = async (req, res) => {
    try {
        const { coupon_type_name } = req.body;
        if (!coupon_type_name) {
            return res.status(400).json({
                message: "Coupon Type name is required",
            });
        }
        const couponExist = await Coupontype.findOne({
            where: {
                coupon_type_name
            }
        });
        if (couponExist) {
            return res.status(400).json({
                message: "Coupon Type Exists",
            }); 
        }
     const newCoupon = await Coupontype.create(
            {
                coupon_type_name
            });
        if (newCoupon) {
            return res.status(200).json({
                message: "Coupon Type Created",
                coupon:newCoupon,
            }); 
        }
        
    } catch (error) {
        return res.status(500).json({
            error:error.message,
        })
    }
}
const editCouponType = async (req, res) => {
    try {
        const { couponId, coupon_type_name } = req.body;
        if (!couponId) {
            return res.status(400).json({
                message: "Coupon id is required",
            });
        }
        if (!coupon_type_name) {
            return res.status(400).json({
                message: "Coupon name is required",
            });
        }

        const coupon = await Coupontype.findOne({ where: { id: couponId } });
        if (!coupon) {
            return res.status(404).json({
                message: "Coupon Code Not Found",
            });
        }
        const updatedCoupon = await coupon.update({
            coupon_type_name,
        })
        return res.status(200).json({
            coupon: updatedCoupon,
            message:"Coupon Code updated",
        })

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error :"Coupon type name exists",
            });            
        }
        else {
            return res.status(500).json({
                error:"Something went wrong",
            }) 
        }        
    }

}
const deleteCouponType = async (req, res) =>{
    try {
        const { couponId } = req.body;
        if (!couponId) {
            return res.status(400).json({
                message: "Coupon id is required",
            });
        }
        const coupon = await Coupontype.findOne({ where: { id: couponId } });
        if (!coupon) {
            return res.status(404).json({
                message: "Coupon Code Not Found",
            });
        }
        await coupon.destroy();
            return res.status(200).json({
                message: "Coupon code deleted",
            });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}
const createCouponCode = async () => {
    try {
        
    } catch (error) {
        
    }
}
const getCouponCodes = async () => {
    try {
        const codes = await Coupon.findAll();
        return res.status(200).json({ codes })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCouponTypes, 
    createCouponType,
    editCouponType,
    deleteCouponType,
    createCouponCode,
    getCouponCodes
}