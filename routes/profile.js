const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', (req, res) => {
    if(req.session.isAuthenticated){
        res.render('profile', {
            isAuth: true,
            email: req.user.email,
            phone: req.user.phone,
            name: req.user.name,
            admin: req.user.isAdmin,
            _id: req.user._id
        })
    }else {
        res.render('auth')
    }
})

router.post('/edit', async (req, res) => {
    const userToSave = await User.findById(req.user._id)
    Object.assign(userToSave, req.body)

    console.log(userToSave);

    await userToSave.save()
    res.redirect('/profile')
})

module.exports = router