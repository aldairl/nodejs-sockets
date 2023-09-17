export const socketController = (socket) => {
    console.log("[Socket] client connected", socket.id)

    socket.on('disconnect', () => {
        console.log("[socket] client disconnected", socket.id)
    })

    // contain a callback
    // it's execute when the server needs send retro info to the client
    socket.on('new-message', (payload, callback) => {
        const id = 123456
        callback(id)

        // send payload for all users
        socket.broadcast.emit('new-message', payload)
    })
}