// html refs
const txtOnline = document.querySelector('#txtOnline')
const txtOffline = document.querySelector('#txtOffline')
const formMessage = document.querySelector('#formMessage')

const socket = io()

socket.on('connect', () => {
    console.log('[client] connected')
    txtOffline.style.display = 'none'
    txtOnline.style.display = ''
})

socket.on('disconnect', () => {
    console.log('[cliente] disconnected')
    txtOffline.style.display = ''
    txtOnline.style.display = 'none'
})

socket.on('new-message', (payload) => {
    console.log('message received', payload)
})

formMessage.addEventListener('submit', (event) => {
    event.preventDefault()
    const { target } = event
    const message = target.message.value
    const payload = {
        id: '1324',
        message,
        date: new Date()
    }

    // this emit contain a callback function
    // it's excute when the server finish the process and send us the response
    socket.emit('new-message', payload, (id) => {
        console.log("desde server", id)
    })

})