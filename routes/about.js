const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('about', {
        isAbout: true
    })
})

module.exports = router