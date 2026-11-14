const express = require('express')
const router = express.Router()
const ventaControllers = require('../controllers/ventaControllers')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', verifyToken, ventaControllers.getALLVentas)
router.get('/:id', verifyToken, ventaControllers.getVenta)
router.post('/', verifyToken, ventaControllers.createVenta)

module.exports = router