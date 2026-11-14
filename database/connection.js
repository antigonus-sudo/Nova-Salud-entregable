const mongoose = require('mongoose')
const { db } = require('../config')

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`)
    .then(() => console.log('conexion exitosa a nova_salud'))
    .catch(() => console.log('error al conectarse'))

module.exports = mongoose