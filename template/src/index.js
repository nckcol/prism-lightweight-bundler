import './index.css'

class Main {

    constructor() {
        document.addEventListener('DOMContentLoaded', this.init.bind(this))
    }

    init() {
        console.log('Scripts loaded!')
    }
}

const main = new Main()