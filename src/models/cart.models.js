import mongoose from 'mongoose'
const { Schema } = mongoose

const cartSchema = new Schema({

})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel