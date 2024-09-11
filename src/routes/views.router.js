import express from "express"
import fs from "fs";

const router = express.Router()

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

router.get("/", (req, res)=>{
    const testUser ={
        name: "Matias"
    }

    res.render("index", {testUser})
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