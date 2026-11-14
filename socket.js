module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id)

        socket.on('stock-actualizado', (data) => {
            io.emit('alerta-stock', data)
        })

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id)
        })
    })
}