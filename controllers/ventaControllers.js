const VentaService = require('../services/ventaService')
const ventaService = new VentaService()

exports.getALLVentas = async (req, res) => {
    const ventas = await ventaService.getALL()
    res.status(200).json(ventas)
}

exports.getVenta = async (req, res) => {
    const venta = await ventaService.filterById(req.params.id)
    if (!venta) return res.status(400).json({ message: 'Venta no encontrada' })
    res.status(200).json(venta)
}

exports.createVenta = async (req, res) => {
    try {
        const data = {
            ...req.body,
            usuarioId: req.user.id
        }
        const venta = await ventaService.create(data)
        res.status(201).json(venta)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}