import Product from "../models/product.model.js"

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.log("Error in fetching products", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.log("Error in fetching product", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

}

export const createProduct = async (req, res) => {
    
    const product = req.body
    if(!product.name || !product.category || !product.price || !product.image || !product.description){
        return res.status(400).json({success: false, message: "Please fill all the fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.log("Error in creating product", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}