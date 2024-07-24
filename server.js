const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/greetings/:user', (req, res) => {
    res.send(`<h1>Hello there ${req.params.user}!</h1>`)
})

app.get('/roll/:number', (req, res) => {
    const param = parseInt(req.params.number)
    const randomReturn = () => {
        return Math.floor(Math.random() * param)
    }
    isNaN(param) ? res.send('<h1>You must specify a number</h1>') : res.send(`<h1>You rolled a ${randomReturn()}</h1>`)
})

app.listen(3000,() => {
    console.log('Listening on port 3000')
})