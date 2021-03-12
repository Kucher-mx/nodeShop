const {Router} = require('express')
const Items = require('../models/items')

const router = Router()

router.get('/', async (req, res) => {
    

    const categoryItems = await Items.find({category: req.query.category})
    console.log(categoryItems);
    console.log(req.user.isAdmin);
    res.render('items', {
        title: req.query.category,
        items: categoryItems,
    })
})

router.get('/add', (req, res) => {
    res.render('addItem', {
        categoriesAvaliable: [{category: 'case'}, {category: 'cable'}, {category: 'accessories'}, {category: 'other'}]
    })
})

router.post('/add', async (req, res) => {
    const {title, descr, priceOld, priceNew, quantity, models, colors, caregories} = req.body
    let colorsArr = colors.split(', ').map(color => {
        return {colorName: color}
    }).filter(el => el !== '')

    let modelsArr = models.split(', ').map(model => { 
        return {modelName: model}
    }).filter(el => el !== '')

    const newItem = await new Items({
        title: title,
        price: priceOld,
        descr: descr,
        quantity: quantity,
        category: caregories,
        color: {
            colors: [...colorsArr]
        },
        model: {
            models: [...modelsArr]
        },
        images: 'some images',
    })

    console.log("newItem", newItem);
    await newItem.save()
    res.redirect('/items/add/photo')
})

router.get('/add/photo', (req, res) => {
    res.render('main')
})

module.exports = router