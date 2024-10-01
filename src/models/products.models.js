import mongoose from 'mongoose'
const { Schema } = mongoose

const productsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
})

const ProductModel = mongoose.model('products', productsSchema)

export default ProductModel