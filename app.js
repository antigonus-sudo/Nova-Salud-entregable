const express = require('express')
const app = express()
const path = require('path')
const connection = require('./database/connection')

const productoRouter = require('./routers/productoRouters')
const categoriaRouter = require('./routers/categoriaRouters')
const clienteRouter = require('./routers/clienteRouters')
const ventaRouter = require('./routers/ventaRouters')
const movimientoRouter = require('./routers/movimientoRouters')
const authRouter = require('./routers/AuthRouters')
const dashboardRouter = require('./routers/dashboardRouter')

const socketio = require('socket.io')
const server = require('http').createServer(app)
const io = socketio(server)
require('./socket')(io)
app.set('io', io)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Vistas
app.get('/', (req, res) => res.redirect('/view-login'))
app.get('/view-login', (req, res) => res.render('login'))
app.get('/view-productos', (req, res) => res.render('productos'))
app.get('/view-venta', (req, res) => res.render('venta'))
app.get('/view-alertas', (req, res) => res.render('alertas'))

// APIs
app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/productos', productoRouter)
app.use('/categorias', categoriaRouter)
app.use('/clientes', clienteRouter)
app.use('/ventas', ventaRouter)
app.use('/movimientos', movimientoRouter)

server.listen(3000, () => {
    console.log('Nova Salud corriendo en http://localhost:3000')
})