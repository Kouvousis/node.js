const Product = require('../models/product.model')

exports.findAll = async(req, res) => {
    console.log("Find all products")

    try {
        const result = await Product.find()
        res.json({status: true, data: result})
    } catch(err) {
        res.json({status: false, data: err})
    }
}

exports.findOne = async(req, res) => {
    const product = req.params.product.replace(/-/g, ' ')
    console.log("Find one product with name: " + product)

    try{
        const result = await Product.findOne({product: product})
        res.json({status: true, data: result})
    } catch(err) {
        res.json({status: false, data: err})
    }
}

exports.create = async(req, res) => {
    const {product, cost, description, quantity} = req.body
    console.log("Creating product: " + product)

    try {
        const newProduct = new Product({
            product: product,
            cost: cost,
            description: description,
            quantity: quantity
        })

        const result = await newProduct.save()
        res.json({status: true, data: result})
    } catch(err) {
        res.json({status: false, data: err})
    }
}

exports.update = async(req, res) => {
    const {product, cost, description, quantity} = req.body
    const productId = req.params.id
    console.log("Updating product with id: " + productId)

    try {
        const updateProduct = await Product.findByIdAndUpdate(
            productId,
            {
                ...(product && { product }),
                ...(cost && { cost }),
                ...(description && { description }),
                ...(quantity && { quantity })
            },
            {new: true}
    )

    if (!updateProduct) {
        return res.json({status: false, message: "Product not found"})
    }
        res.json({status: true, data: updateProduct})
    } catch(err) {
        res.json({status: false, data: err})
    }
}

exports.delete = async(req, res) => {
    const productId = req.params.id
    console.log("Deleting product: " + productId)

    try {
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if (!deleteProduct) {
            return res.json({status: false, message: "Product not found"})
        }
        res.json({status: true, data: deleteProduct})
    } catch(err) {
        res.json({status: false, data: err})
    }
}