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
    res.render("index", {})
})

router.get("/productregistration", (req, res)=>{
    const testUser ={
        name: "Matias",
        role: "admin"
    }

    res.render("productregistration", {
        user: testUser,
        isAdmin: testUser.role === "admin",
        products
    })
})

router.get("/indexproducts", (req, res)=>{
    const testUser ={
        name: "Matias",
        role: "admin"
    }

    res.render("indexproducts", {
        user: testUser,
        isAdmin: testUser.role === "admin",
        products
    })
})

export default router