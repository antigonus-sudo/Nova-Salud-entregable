const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventaSchema = new Schema({
    clienteId: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    usuarioId: { type: Schema.Types.ObjectId, ref: 'UserAuth' },
    items: [{
        productoId: { type: Schema.Types.ObjectId, ref: 'Producto' },
        nombre: String,
        cantidad: Number,
        precioUnitario: Number,
        subtotal: Number
    }],
    total: Number,
    metodo_pago: String,
    fecha: { type: Date, default: Date.now }
})

const Venta = mongoose.model('Venta', ventaSchema)
module.exports = Venta