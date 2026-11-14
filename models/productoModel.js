const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    stock: { type: Number, default: 0 },
    stockMinimo: { type: Number, default: 5 },
    marca: String,
    categoriaId: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    activo: { type: Boolean, default: true }
})

const Producto = mongoose.model('Producto', productoSchema)
module.exports = Producto