import { Router } from "express";

const router = Router()

const products =[]

router.get("/", (req, res)=>{
    res.json(products)
} )

router.post("/", (req,res)=>{
    const newProduct = req.body
    products.push(newProduct)
    res.status(201).json(newProduct)
})

export default router