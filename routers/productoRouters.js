const express = require('express')
const router = express.Router()
const productoControllers = require('../controllers/productoControllers')
const { verifyToken } = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')

router.get('/', verifyToken, productoControllers.getALLProducts)
router.get('/bajo-stock', verifyToken, productoControllers.getBajoStock)
router.get('/:id', verifyToken, productoControllers.getProduct)
router.post('/', verifyToken, verifyAdmin, productoControllers.createProduct)
router.put('/:id', verifyToken, verifyAdmin, productoControllers.updateProduct)
router.delete('/:id', verifyToken, verifyAdmin, productoControllers.deleteProduct)

module.exports = router