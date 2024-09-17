import express from "express"
import fs from "fs";

const router = express.Router()

//Funcionalidades FS
const productsFilePath = 'products.json'

function readProducts() {
    try {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

//Routes
const products = readProducts()

router.get("/", (req, res)=>{
    const testUser ={
        name: "admin",
        role: "admin"
    }

    res.render("home", {
        user: testUser,
        isAdmin: testUser.role === "admin",
        products
    })
})

router.get("/realtimeproducts", (req, res)=>{
    const testUser ={
        name: "admin",
        role: "admin"
    }

    res.render("realtimeproducts", {
        user: testUser,
        isAdmin: testUser.role === "admin",
        products
    })
})

export default router