import { readFileSync, writeFileSync } from 'node:fs'

class TicketControl {
    constructor() {
        this.last = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.last4Tickets = []
        this.pathFile = './src/db/data.json'

        this.init()
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4Tickets: this.last4Tickets
        }
    }

    init() {
        const { last, today, tickets, last4Tickets } = JSON.parse(readFileSync(this.pathFile))

        if (today === this.today) {
            this.today = today
            this.last = last
            this.tickets = tickets
            this.last4Tickets = last4Tickets
        } else {
            this.saveOnDB()
        }
    }

    saveOnDB() {
        writeFileSync(this.pathFile, JSON.stringify(this.toJson))
    }
}

export default TicketControl