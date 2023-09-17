import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as ServerIo } from 'socket.io'
import indexRoutes from '../routes/index.js'
import { socketController } from '../sockets/controllers.js'

export default class Server {
    constructor() {
        this.app = express()
        this.server = createServer(this.app);
        this.io = new ServerIo(this.server);
        this.port = process.env.PORT
        this.apiPath = {
            index: '/api'
        }

        // moddlewares
        this.middlewares()

        // routes
        this.routes()

        // sockets
        this.sockets()
    }

    middlewares() {
        // Public folder
        this.app.use(express.static('public'))
        // CORS
        this.app.use(cors())
        // parse body
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPath.index, indexRoutes)
    }

    sockets() {
        this.io.on('connection', socketController )
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('[server] listen in port ', this.port)
        })
    }
}
