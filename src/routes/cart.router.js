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

    if (products.lenght = 0) {
        return res.status(400).json({ error: "Debe agregar productos para crear un carrito" })
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
        return res.status(404).json({ error: "Carrito no encontrada" })
    }
    res.status(200).json(cart)
})

router.post("/:id/products/:id", (req, res) => {

})

export default router