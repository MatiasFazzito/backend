import { Router } from 'express'
import ProductModel from '../models/products.models.js'
import { uploader } from '../utils.js'

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

        const options = {
            page,
            limit: rows,
            lean: true
        }

        const products = await ProductModel.paginate({}, options)

        products.prevLink = products.hasPrevPage ? `/product?page=${products.prevPage}` : ''
        products.nextLink = products.hasNextPage ? `/product?page=${products.nextPage}` : ''

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


export default router
