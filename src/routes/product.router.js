import { Router } from 'express'
import ProductModel from '../models/products.models.js'
import { uploader } from '../utils.js'
import CartModel from "../models/cart.models.js"

const router = Router()

router.post('/', uploader.single('file'), async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body)
        newProduct.thumbnail = req.file.path

        await newProduct.save()

        res.render('product', { product: newProduct.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al crear producto' })
        console.error(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const rows = parseInt(req.query.rows) || 5
        const category = req.query.category
        const sortField = req.query.sortField || 'price'
        const sortOrder = req.query.sortOrder || 'asc'

        const options = {
            page,
            limit: rows,
            sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 },
            filter: category ? { category } : {},
            lean: true
        }

        const products = await ProductModel.paginate(category ? { category } : {}, options)

        products.prevLink = products.hasPrevPage ? `/product?page=${products.prevPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}`: ''
        products.nextLink = products.hasNextPage ? `/product?page=${products.nextPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}`: ''

        products.isValid = products.docs.length > 0

        res.render('products', { products })

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.render('product', { product: product.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.redirect('/product')

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.redirect('/product')

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.post('/:id/addToCart', async (req, res) => {
    try {
        const { quantity = 1 } = req.body
        const cartId = req.body.cartId

        const product = await ProductModel.findById(req.params.id)
        const cart = await CartModel.findById(cartId)

        const productIndex = cart.products.findIndex(item => item.product.toString() === product._id.toString())

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = Number(cart.products[productIndex].quantity) + Number(quantity)
        } else {
            cart.products.push({ product: product._id, quantity })
        }

        await cart.save()

        res.redirect(`/cart/${cartId}`)
    } catch (error) {
        res.render("error", { error: 'Error al agregar el producto al carrito' })
    }
})


export default router
