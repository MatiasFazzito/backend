import express from "express"
import path from "path";
import fs from "fs";
import __dirname from "./utils.js"
import productRoutes from "./routes/product.router.js"
import cartRoutes from "./routes/cart.router.js"
import viewsRoutes from "./routes/views.router.js"
import usersRoutes from "./routes/users.router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io";

const app = express()
const httpServer = app.listen(8080, () => { console.log("listening on 8080") })
const io = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", viewsRoutes)
app.use("/users", usersRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use(express.static(path.join(__dirname, "public")))

//logica para enviar array de productos al socket
const productsFilePath = 'products.json'
function readProducts() {
    try {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
const products = readProducts()

io.on("connection", (socket) =>{
    console.log("Nuevo cliente conectado")

    socket.on("message", data =>{
        console.log(data);
    })
    io.emit("message", "Listo para agregar productos")

    socket.on("productContainer", data=>{
        data
    })
    io.emit("productContainer", products)
})