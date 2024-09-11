import { Router } from "express"
import fs from "fs"

const router = Router()

const usersFilePath = 'users.json'

function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeUser(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

const users = readUsers()

router.get("/", (req, res) => {
    res.json(users)
})

router.post("/", (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password ) {
        return res.status(400).json({ error: "Datos invallidos" })
    }

    const newUser = {
        name,
        email,
        password,
        role: "admin"
    }

    users.push(newUser)

    writeUser(users)

    res.status(201).json({ message: "Usuario agregado exitosamente" })
})

export default router