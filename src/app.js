import express from "express"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from "url"
import productRoutes from "./routes/product.router.js"
import cartRoutes from "./routes/cart.router.js"

const app = express()

app.listen(8080, () => { console.log("listening on 8080") })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicPath = path.join(__dirname, "public")

app.use("/static", express.static(publicPath))