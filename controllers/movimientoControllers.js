const MovimientoService = require('../services/movimientoService')
const movimientoService = new MovimientoService()

exports.getALLMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientoService.getALL()
        res.status(200).json(movimientos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.createMovimiento = async (req, res) => {
    try {
        const mov = await movimientoService.create(req.body)
        res.status(201).json(mov)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}