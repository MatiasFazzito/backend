import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose

const productsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    thumbnail: {type: String, required: true}
})
productsSchema.index({title: 1})

productsSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model('products', productsSchema)

export default ProductModel