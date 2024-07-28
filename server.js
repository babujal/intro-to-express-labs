const express = require('express')

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


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
    !param ? res.send('<h1>You must specify a number</h1>') : res.send(`<h1>You rolled a ${randomReturn()}</h1>`)
})

app.get('/collectibles/:index', (req, res) => {
    const param = req.params.index
    const item = collectibles[param]

    if (!item) {
        return res.send('<h1>This item is not yet in stock. Check back soon!</h1>')
    }

    const itemName = item.name
    const itemPrice = item.price
    res.send(`<h1>So, you want the ${itemName}? For ${itemPrice}, it can be yours!</h1>`)
})

app.get('/shoes', (req, res) => {
    const minPrice = parseInt(req.query.minPrice)
    const maxPrice = parseInt(req.query.maxPrice)
    const shoesType = req.query.type
    let shoesToSend = [...shoes]

    console.log(shoesToSend)

    if (minPrice) {
        shoesToSend = shoesToSend.filter(shoes => shoes.price >= minPrice)
    }

    if (maxPrice) {
        shoesToSend = shoesToSend.filter(shoes => shoes.price <= maxPrice)
    }

    if (shoesType) {
        shoesToSend = shoesToSend.filter(shoes => shoes.type === shoesType)
    }


    res.send(shoesToSend)
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})

//http://localhost:3000/shoes?minPrice=50&maxPrice=100&type=sandal