import { Router } from "express"
import { v4 as uuidv4 } from "uuid"

const router = Router()

const carts = []

router.post("/", (req, res) => {
    const { products } = req.body

    const newCart = {
        id: uuidv4(),
        products
    }

    carts.push(newCart)
    res.status(201).json({ message: "Carrito agregado exitosamente" })
})

router.get("/", (req, res) => {
    res.json(carts)
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    const cart = carts.find(cart => cart.id === id)
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" })
    }
    res.status(200).json(cart)
})

router.post("/:id/products/:pid", (req, res) => {
    const id = req.params.id
    const pid = req.params.pid

    const cart = carts.find(cart => cart.id === id)
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" })
    }
    const product = {
        
    }
})

export default router