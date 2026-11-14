const express = require('express')
const router = express.Router()
const movimientoControllers = require('../controllers/movimientoControllers')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', verifyToken, movimientoControllers.getALLMovimientos)
router.post('/', verifyToken, movimientoControllers.createMovimiento)

module.exports = router