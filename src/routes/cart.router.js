import { Router } from "express";

const router = Router()

const cart =[]

router.get("/", (req, res)=>{
    res.json(cart)
} )

router.post("/", (req,res)=>{
    const addProduct = req.body
    cart.push(addProduct)
    res.status(201).json(addProduct)
})

export default router