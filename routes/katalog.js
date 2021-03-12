const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('katalog', {
        isKatalog: true,
        categories: [{
            type: 'case',
            title: 'Cases for your Iphone',
            descr: 'lorem lorem lorem  lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem loremlorem',
            alt: 'cases'
        },
        {
            type: 'cables',
            title: 'cables for your Iphone',
            descr: 'lorem lorem lorem  lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem loremlorem',
            alt: 'cables'
        },
        {
            type: 'accessories',
            title: 'accessories for your Iphone',
            descr: 'lorem lorem lorem  lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem loremlorem',
            alt: 'accessories'
        },
        {
            type: 'other',
            title: 'Gadgets for your Iphone',
            descr: 'lorem lorem lorem  lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem loremlorem',
            alt: 'other'
        }]
    })
})

router.get('/:id', (req, res) => {
    res.redirect('/items?category=' + req.params.id)
})

module.exports = router