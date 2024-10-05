import { Router } from "express"
import CartModel from "../models/cart.models.js"

const router = Router()

router.post("/", async (req, res) => {
    try {
        const newcart = new CartModel(req.body)

        await newcart.save()

        res.render('cart', {cart: newcart.toObject()})

    } catch (error) {
        res.render('error', { error: 'Error al crear carrito' })
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

    } catch (error) {
        res.render('error', { error: 'Error al mostrar carrito' })
    }
})

router.put("/:cid", async (req, res) => {
    try {

    } catch (error) {
        res.render('error', { error: 'Error al modificar carrito' })
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {

    } catch (error) {
        res.render('error', { error: 'Error al modificar producto en carrito' })
    }
})

router.delete("/:cid", async (req, res) => {
    try {

    } catch (error) {
        res.render('error', { error: 'Error al eliminar carrito' })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {

    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto en carrito' })
    }
})

export default router