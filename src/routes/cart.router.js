import { Router } from "express"
import CartModel from "../models/cart.models.js"
import ProductModel from "../models/products.models.js";

const router = Router()

router.post("/", async (req, res) => {
    try {
        const { title } = req.body

        const newcart = new CartModel({ title })

        await newcart.save()

        res.redirect(`/cart/${newcart._id}`)

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

router.get('/product/allproducts', async (req, res) => {
    try {
        const products = await ProductModel.find()

        res.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        res.status(500).send('Error fetching products')
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

        res.render('cart', { cart: cart.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al mostrar carrito' })
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { productId, quantity } = req.body

        const cart = await CartModel.findById(cid)
        const product = await ProductModel.findById(productId)
        if (!product) {
            return res.render("error", { error: 'Debe seleccionar un producto valido' })
        }

        const existingProduct = cart.products.find(p => p.product._id.toString() === productId)
        if (existingProduct) {
            existingProduct.quantity += parseInt(quantity)
        } else {
            cart.products.push({ product: product._id, quantity: parseInt(quantity) })
        }

        await cart.save()

        res.redirect(`/cart/${cid}`)

    } catch (error) {
        res.render('error', { error: 'Error al agregar productos al carrito' })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params

        const cart = await CartModel.findById(cid)

        cart.products = []
        await cart.save()

        res.redirect(`/cart/${cid}`)

    } catch (error) {
        res.render('error', { error: 'Error al eliminar carrito' })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params

        const cart = await CartModel.findById(cid)

        const productIndex = cart.products.findIndex(p => p._id.toString() === pid)
        if (!productIndex) {
            return res.render("error", { error: 'Producto no encontrado en el carrito' })
        }

        cart.products.splice(productIndex, 1)
        cart.save()

        res.redirect(`/cart/${cid}`)

    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto en carrito' })
    }
})

export default router