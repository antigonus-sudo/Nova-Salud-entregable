const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movimientoSchema = new Schema({
    productoId: { type: Schema.Types.ObjectId, ref: 'Producto' },
    tipo: { type: String, enum: ['ENTRADA', 'SALIDA', 'AJUSTE'] },
    cantidad: Number,
    motivo: String,
    ventaId: { type: Schema.Types.ObjectId, ref: 'Venta' },
    fecha: { type: Date, default: Date.now }
})

const Movimiento = mongoose.model('Movimiento', movimientoSchema)
module.exports = Movimiento