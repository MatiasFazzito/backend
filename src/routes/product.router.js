import { Router } from "express"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import { uploader } from "../utils.js"

const router = Router()

//Funcionalidades FS
const productsFilePath = 'products.json'

function readProducts() {
    try {
        const data = fs.readFileSync(productsFilePath)
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products))
}

//Routes
const products = readProducts()

router.get("/", (req, res) => {
    res.json(products)
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.id === id)
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrada" })
    }
    res.status(200).json(product)
})

router.post("/", uploader.single("file"), (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Datos invallidos" })
    }
    if (!req.file) {
        return res.status(400).send({status:"error", error: "No se pudo cargar la imagen"})
    }

    const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail: req.file.path
    }

    products.push(newProduct)

    writeProducts(products)

    res.status(201).json({ message: "Producto agregado exitosamente" })
})

router.put("/:id", (req, res) => {
    const productId = req.params.id
    const { title, description, code, price, status, stock, category } = req.body
    const productIndex = products.findIndex(product => product.id === productId)

    if (productIndex === -1) {
        res.status(404).json({ error: "Producto no encontrada" })
    }

    const originalProduct = products[productIndex]

    const updatedProduct = {
        ...originalProduct,
        ...title ? { title } : {},
        ...description ? { description } : {},
        ...code ? { code } : {},
        ...price ? { price } : {},
        ...status ? { status } : {},
        ...stock ? { stock } : {},
        ...category ? { category } : {}
    }

    products[productIndex] = updatedProduct
    writeProducts(products)
    res.status(200).json(updatedProduct)
})


//agregar event handler para boton
router.delete("/:id", (req, res) => {
    const productToDelete = req.params.id
    const productIndex = products.findIndex(product => product.id === productToDelete)
    if (productIndex === -1) {
        res.status(404).json({ error: "Producto no encontrado" })
    }

    products.splice(productIndex, 1)
    writeProducts(products)
    res.status(204).json({ message: "Producto eliminado" })
})

export default router
