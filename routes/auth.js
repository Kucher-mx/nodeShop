const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth', {
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
    })
    res.redirect('/auth')
})

router.post('/reg', async (req, res) => {
    try{
        const {regMail, regPass, repeatPass, regName, regPhone} = req.body
        const candidate = await User.findOne({email: regMail})
        

        if(regPass === repeatPass && !candidate){
            const hashPass = await bcrypt.hash(regPass, 10)

            if(regMail === 'max.kucher98@gmail.com'){

                const newUser = new User({
                    email: regMail, password: hashPass, phone: regPhone, name: regName, isAdmin: true,
                })
                await newUser.save()
                console.log(newUser);
            } else{

                const newUser = new User({
                    email: regMail, password: hashPass, phone: regPhone, name: regName, cart: {items: []}
                })
                await newUser.save()
                console.log(newUser);
            }
            res.redirect('/auth')
        }else {
            res.redirect('/')
        }
    }catch(e){
        console.log(e);
    }
})

router.post('/log', async (req, res) => {
    const {logMail, logPass} = req.body
    const candidate = await User.findOne({email: logMail})

    if(candidate){
        console.log(candidate);
        const samePass = await bcrypt.compare(logPass, candidate.password)

        if(samePass){
            req.session.isAuthenticated = true
            req.session.admin = candidate.isAdmin
            req.session.user = candidate
            req.session.save((err) => {
                if(err){
                    console.log(err);
                }
                res.redirect('/')
            })
        }else{
            res.redirect('/auth')
        }

    }else{
        console.log('No such candidate!!!');
        res.redirect('/auth')
    }
})

module.exports = router