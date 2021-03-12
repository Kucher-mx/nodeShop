module.exports = (req, res, next) => {
    res.locals.admin = req.session.admin
    res.locals.isAuth = req.session.isAuthenticated
    
    next()
}