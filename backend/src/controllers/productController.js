// const db = require('../models')
const asyncHandler = require("express-async-handler")
const {Product} = require('./../database/models');
const addProduct = async (req, res) => {
    try {      
        const price = req.body.price;
        const description = req.body.description;      
        const name = req.body.name;
        const image = req.file;
        const quantity = req.body.quantity;
        if (!name) {
            return res.status(400).json({
                message:"Please add product name",
            });
        }
        else
        if (!quantity) {
            return res.status(400).json({
                message:"Please add product quantity",
            }); 
        }
       else if (!price) {
            return res.status(400).json({
                message:"Please add product price",
            });
        }
        else if (!description) {
            return res.status(400).json({
                message:"Please add product description",
            });
            } 
            else if (!image) {
                return res.status(400).json({
                    message:"Please add product image",
                }); 
            }
        
           
            let info = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,   
                image: req.file.path,
                quantity:req.body.quantity,
            }
            const exstingProduct = await Product.findOne({ where: { name: req.body.name } })
            if (exstingProduct) {
                return res.status(400).json({
                    message: "Product already exist"
                });
            } else {
            const product = await Product.create(info);                
                    return res.status(200).json({
                        product,
                        message:"Product added succesfully"
                    })                 
            }
    
} catch (error) {
    console.log(error)
}
}   
const getProducts = async(req,res) => {
    const products = await Product.findAll({
        attributes: [
            "id",
            'name',
            'price',
            "description",
            "image",
            "quantity"
        ]
    })
    if (products) {
        return res.status(200).send(products);
    } else {
        return res.status(404).json("No Product has been listed so far");
 }
}
const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            where: { id: id }, 
            attributes: [
                "id",
                'name',
                'price',
                "description",
                "image",
                "quantity",
            ],
        })
        
    if (product) {
        return res.status(200).json({
            product
        });
    } else {
        return res.status(404).json({
            message:"Product with that UUID not found",
        })
  }
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}
const getProductDetail = async (req, res) => {
    try {
        const id = req.params.id
    const product = await Product.findOne({
        where: { id: id }, 
        attributes: [
            "id",
            'name',
            'price',
            "description",
            "image",
            "quantity"
        ],
    })
    if (product) {
        return res.status(200).json({
            product
        });
    } else {
        return res.status(404).json({
            message:"Product with that UUID not found",
        })
  }
    } catch (error) {
        console.log(error)
    }
}
const updateProduct = async (req, res) => {
    
    let n = req.body.name
    if (!n) {
        return res.status(400).json({
            message:"Name is required"
        })
    }
    const product = await Product.findOne({ where: { id: req.params.id } })
    if (!product) {
        return res.status(404).json({
            message:"Product not found"
        })
    } 

        const { id, name, description, image, price, quantity } = product;
        product.id = id;
        product.name = req.body.name || name;
        product.description = req.body.description || description;
        product.image =  req?.file ? req?.file?.path : image;
        product.price = req.body.price || price;
        product.quantity = req.body.quantity || quantity;
        const updatedProduct = await product.update();
        return res.status(200).json({
            id: updatedProduct.id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            image: updatedProduct.image,
            quantity:updatedProduct.quantity,
        })
   
};

/**
*  @desc    Delete product
* @route   DELETE /api/products/:id
* @access  Private
@return
**/ 
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } })
  
    if (!product) {
        res.status(400)
        throw new Error('product not found')
    }
  
    await product.destroy()
  
    return res.status(200).json("product deleted successfully")
});
  
/**
 * @summary get products by admin
 * @route private access by loged in user
 * @return 
 * **/

const getProductsByAdmin = async(req,res) => {
   try {
    const products = await Product.findAll({
        attributes: [
            "id",
            'name',
            'price',
            "description",
            "image",
            "quantity",
            "createdAt"
        ]
    })
    if (products) {
        return res.status(200).json({products});
    } else {
        return res.status(200).json({
            message: "No Product has been listed so far",
            products:[],
        });
 }
   } catch (error) {
       return res.status(500).json({
           error:error.message,       
    })
   }
}

module.exports = {
    addProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductDetail,
    getProductsByAdmin,
   
}