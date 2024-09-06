import { Router } from "express"
import fs from "fs";
import { v4 as uuidv4 } from "uuid"

const router = Router()

const cartsFilePath = 'carts.json'
const productsFilePath = 'products.json'

// Función para leer los cart desde el archivo
function readCarts() {
    try {
        const data = fs.readFileSync(cartsFilePath);
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

// Función para escribir los cart en el archivo
function writeCarts(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
}

function readProducts() {
    try {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Leemos los cart al iniciar la aplicación
const carts = readCarts();
const products = readProducts();

router.post("/", (req, res) => {
    const newCart = {
        id: uuidv4(),
        products: []
    }

    carts.push(newCart)
    writeCarts(carts)
    res.status(201).json({ message: "Carrito agregado exitosamente" })
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

    const product = products.find(product => product.id === pid)
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const productInCart = cart.products.findIndex(item => item.pid === pid)
    if (productInCart !== -1) {
        cart.products[productInCart].quantity = (cart.products[productInCart].quantity || 1) + 1
    } else {
        cart.products.push({ pid, quantity: 1 })
    }

    writeCarts(carts);
    res.status(200).json({ message: "Producto agregado al carrito exitosamente" })
})

export default router