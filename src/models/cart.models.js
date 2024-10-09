import mongoose from 'mongoose'

const { Schema } = mongoose

const cartSchema = new Schema({
  title: { type: String, requires: true },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: Number
      }
    ],
    default: []
  }
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel