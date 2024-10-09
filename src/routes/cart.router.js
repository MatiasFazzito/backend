import { Router } from "express"
import CartModel from "../models/cart.models.js"
import ProductModel from "../models/products.models.js";

const router = Router()

router.post("/", async (req, res) => {
    try {
        const { title } = req.body

        const newcart = new CartModel({ title })

        await newcart.save()

        res.render('cart', { cart: newcart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al crear carrito' })
    }
})

router.get('/allcarts', async (req, res) => {
    try {
        const carts = await CartModel.find()

        res.json(carts)
    } catch (error) {
        console.error('Error fetching carts:', error)
        res.status(500).send('Error fetching carts')
    }
})

router.get("/", async (req, res) => {
    try {
        const carts = await CartModel.find()

        res.render('carts', { carts: carts.map(cart => cart.toObject()) })
    } catch (error) {
        res.render('error', { error: 'Error al mostrar carritos' })
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid).populate("products.product")

        res.render('cart', {cart: cart.toObject()})

    } catch (error) {
        res.render('error', { error: 'Error al mostrar carrito' })
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body

        if (!Array.isArray(products)) {
            return res.render("error", { error: 'Los productos deben ser un arreglo' })
        }

        const cart = await Cart.findById(cid)
        if (!cart) {
            return res.render("error", { error: 'Carrito no encontrado' })
        }

        CartModel.products = products;
        await CartModel.save()

        res.render("cart", { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al modificar carrito' })
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        if (!quantity || quantity <= 0) {
            return res.render("error", { error: 'Cantidad inválida' })
        }

        const cart = await CartModel.findById(cid);
        if (!cart) {
            return res.render("error", { error: 'Carrito no encontrado' })
        }

        const product = await ProductModel.findById(pid)

        if (!product) {
            return res.render("error", { error: 'Producto no encontrado' })
        }

        const productIndex = CartModel.products.findIndex(p => p._id.toString() === pid)

        if (productIndex !== -1) {
            CartModel.products[productIndex].quantity = quantity
        } else {
            CartModel.products.push({ product: product._id, quantity })
        }

        await CartModel.save()

        res.render("cart", { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al modificar producto en carrito' })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await CartModel.findById(cid)
        if (!cart) {
            return res.render("error", { error: 'Carrito no encontrado' })
        }

        cart.products = []
        await cart.save()

        res.render("cart", { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al eliminar carrito' })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params

        const cart = await CartModel.findById(cid)

        if (!cart) {
            return res.render("error", { error: 'Carrito no encontrado' })
        }

        const productIndex = CartModel.products.findIndex(p => p._id.toString() === pid)
        if (productIndex === -1) {
            return res.render("error", { error: 'Producto no encontrado en el carrito' })
        }

        CartModel.products.splice(productIndex, 1)
        await cart.save()

        res.render("cart", { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto en carrito' })
    }
})

export default router