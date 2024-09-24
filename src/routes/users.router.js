import { Router } from "express"
import UserModel from "../models/user.models.js"

const userRouter = Router()

userRouter.post("/users", async (req, res) => {
    try {
        const user = new UserModel(req.body)
        console.log("El usuario es: ", user)

        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({})
        console.log("users:", users)

    } catch (error) {
        res.status(500).send(error)
    }
})

userRouter.get("/users/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado", error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: "Error al buscar",
            error
        })
    }
})

userRouter.put("/users/:id", async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            return res.status(404).send({message: "Usuario no encontrado", error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: "Error al buscar",
            error
        })
    }
})

userRouter.delete("/users/:id", async (req, res)=>{
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({message: "Usuario no encontrado", error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: "Error al buscar",
            error
        })
    }
})

export default userRouter