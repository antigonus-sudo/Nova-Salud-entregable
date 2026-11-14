const Movimiento = require('../models/movimientoModel')
const Producto = require('../models/productoModel')

class MovimientoService {
    constructor() {}

    async getALL() {
        return await Movimiento.find({}).sort({ fecha: -1 }).limit(100)
    }

    // Registrar entrada de mercadería
    async create(data) {
        const mov = new Movimiento({
            productoId: data.productoId,
            tipo: data.tipo || 'ENTRADA',
            cantidad: data.cantidad,
            motivo: data.motivo || 'REPOSICION'
        })
        const guardado = await mov.save()

        if (data.tipo === 'ENTRADA') {
            await Producto.findByIdAndUpdate(data.productoId, {
                $inc: { stock: data.cantidad }
            })
        }
        return guardado
    }
}

module.exports = MovimientoService