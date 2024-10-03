import express from 'express'
import handlebars from 'express-handlebars'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import productRoutes from './routes/product.router.js'
import viewsRoutes from './routes/views.router.js'
import cartRoutes from './routes/cart.router.js'

const app = express()
const httpServer = app.listen(8080, () => { console.log('listening on 8080') })
export const io = new Server(httpServer)

dotenv.config()

const URIConection = process.env.URIMONGO

mongoose.connect(URIConection)
    .then(console.log('Conectado a mongo'))
    .catch((error) => console.error('Error en conexion:', error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRoutes)
app.use('/api/product', productRoutes)
app.use('/api/carts', cartRoutes)
app.use(express.static(__dirname + '/public'))