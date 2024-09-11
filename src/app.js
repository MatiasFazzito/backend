import express from "express"
import { publicPath } from "./utils.js";
import productRoutes from "./routes/product.router.js"
import cartRoutes from "./routes/cart.router.js"
import { Server } from "socket.io";

const app = express()
const httpServer = app.listen(8080, () => { console.log("listening on 8080") })

/*const io = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/static", express.static(publicPath))