import { Router } from 'express'
import UserModel from '../models/user.models.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const user = new UserModel(req.body)
        console.log('El usuario es: ', user)

        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.send(users)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado', error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: 'Error al buscar',
            error
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            return res.status(404).send({message: 'Usuario no encontrado', error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: 'Error al buscar',
            error
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({message: 'Usuario no encontrado', error})
        }
        res.send(user)

    } catch (error) {
        res.status(500).send({
            message: 'Error al buscar',
            error
        })
    }
})

export default router