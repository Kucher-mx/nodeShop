const {Router} = require('express')
const Items = require('../models/items')

const router = Router()

router.get('/:id', async (req, res) => {
    const itemRender = await Items.findById(req.params.id)
    const {title, descr, price, quantity, _id, color, model} = itemRender
    res.render('item', {
        title, descr, price, quantity, _id, colors: color.colors, models: model.models
    })
    console.log(itemRender);
})

router.get('/edit/:id', async (req, res) => {
    const itemRender = await Items.findById(req.params.id)
    let colors = itemRender.color.colors.map(color => {
        return color.colorName
    }).filter(el => el !== '')

    let models = itemRender.model.models.map(model => {
        return model.modelName
    }).filter(el => el !== '')

    console.log(colors, models);
    res.render('edit', {
        data: itemRender,
        colors: colors,
        models: models,
    })
})

router.post('/edit/:id', async (req, res) => {
    // update
    const toChange = await Items.findById(req.params.id)
    const change = req.body
    change.color = {colors : req.body.colors.split(', ').map(color => {
                return {colorName: color}
            }).filter(el => el !== '')}
    
    change.model = {models : req.body.models.split(', ').map(model => {
                return {modelName: model}
            }).filter(el => el !== '')}

    Object.assign(toChange, change)
    delete(change.models)
    delete(change.colors)

    console.log(toChange, req.body);
    await toChange.save()
    res.redirect('/item/' + req.params.id)
})

router.post('/remove/:id', async (req, res) => {
    await Items.deleteOne({"_id" : req.params.id})
    console.log("item deleted");
    res.status(200).redirect('/category')
})


module.exports = router