import { Router } from 'express'
import ProductModel from '../models/products.models.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body)
        
        await newProduct.save()

        res.render('product', { product: newProduct.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al crear producto' })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find()


        res.render('products', { products: products.map(product => product.toObject()) })

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


export default router
