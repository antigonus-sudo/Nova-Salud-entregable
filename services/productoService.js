const Producto = require('../models/productoModel')

class ProductoService {
    constructor() {}

    async getALL() {
        return await Producto.find({ activo: true })
    }

    async filterById(id) {
        return await Producto.findOne({ _id: id })
    }

    async create(data) {
        const producto = new Producto(data)
        return await producto.save()
    }

    async update(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id) {
        return await Producto.findByIdAndUpdate(id, { activo: false })
    }

    async getBajoStock() {
        return await Producto.find({
            activo: true,
            $expr: { $lte: ['$stock', '$stockMinimo'] }
        })
    }
}

module.exports = ProductoService