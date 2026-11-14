const Venta = require('../models/ventaModel')
const Producto = require('../models/productoModel')
const Movimiento = require('../models/movimientoModel')

class VentaService {
    constructor() {}

    async getALL() {
        return await Venta.find({}).sort({ fecha: -1 })
    }

    async filterById(id) {
        return await Venta.findOne({ _id: id })
    }

    async create(data) {
        let total = 0
        const itemsProcesados = []

        for (const item of data.items) {
            const producto = await Producto.findOne({ _id: item.productoId })
            if (!producto || !producto.activo) {
                throw new Error(`Producto no encontrado: ${item.productoId}`)
            }
            if (producto.stock < item.cantidad) {
                throw new Error(`Stock insuficiente para ${producto.nombre}`)
            }

            const subtotal = producto.precio * item.cantidad
            total += subtotal

            itemsProcesados.push({
                productoId: producto._id,
                nombre: producto.nombre,
                cantidad: item.cantidad,
                precioUnitario: producto.precio,
                subtotal
            })
        }

        // 2. Guardar venta
        const venta = new Venta({
            clienteId: data.clienteId || null,
            usuarioId: data.usuarioId,
            items: itemsProcesados,
            total,
            metodo_pago: data.metodo_pago
        })
        const ventaGuardada = await venta.save()

        // 3. Descontar stock y registrar movimientos
        for (const item of itemsProcesados) {
            await Producto.findByIdAndUpdate(item.productoId, {
                $inc: { stock: -item.cantidad }
            })
            const mov = new Movimiento({
                productoId: item.productoId,
                tipo: 'SALIDA',
                cantidad: item.cantidad,
                motivo: 'VENTA',
                ventaId: ventaGuardada._id
            })
            await mov.save()
        }
        return ventaGuardada
    }

    async delete(id) {
        return await Venta.findByIdAndDelete(id)
    }

    // Reportes del dashboard
    async getVentasHoy() {
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        return await Venta.find({ fecha: { $gte: hoy } })
    }
}

module.exports = VentaService