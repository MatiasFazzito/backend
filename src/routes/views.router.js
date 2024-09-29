import express from "express"

const router = express.Router()

router.get("/", (req, res) =>{
    res.render("home")
} )

router.get("/products", (req, res) =>{
    res.render("products")
})

router.get("/products/addproduct", (req, res) =>{
    res.render("addproduct")
})

export default router