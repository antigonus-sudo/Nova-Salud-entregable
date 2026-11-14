const mongoose = require('mongoose')

const UserAuthSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' }
})

const UserAuth = mongoose.model('UserAuth', UserAuthSchema)
module.exports = UserAuth