const AuthService = require('../services/AuthService')
const bcrypt = require('bcrypt')

const authService = new AuthService()

exports.register = async (req, res) => {
    try {
        await authService.register(req.body)
        res.status(201).json({ "message": "Usuario registrado correctamente" })
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userAuth = await authService.filterByEmail(email)
        
        if (!userAuth) {
            return res.status(400).json({ "message": "Usuario no encontrado" })
        }
        
        const passwordMatch = bcrypt.compareSync(password, userAuth.password)
        if (!passwordMatch) {
            return res.status(400).json({ "message": "Contraseña incorrecta" })
        }

        const payload = {
            id: userAuth._id,
            email: userAuth.email,
            role: userAuth.role
        }
        
        const token = authService.generateToken(payload)
        res.status(200).send(token)

    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}