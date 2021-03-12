const {Router} = require('express')
const User = require('../models/user')
const Order = require('../models/order')
const Items = require('../models/items')

const router = Router()

router.get('/', async (req, res) => {
    res.render('main', {
        isMain: true
    })
    req.session.cart = {items: []}
})

router.post('/buy', async(req, res) => {
    res.render('main', {
        isMain: true
    })
    // console.log(req.body);
    const item = {
        price: req.body.price,
        name: req.body.name,
        sale: req.body.sale,
        id: 'someid23r34242'
    }

    req.session.cart.push(item)
    // console.log(req.session);
})

module.exports = router