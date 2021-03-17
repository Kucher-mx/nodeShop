module.exports = (req, res, next) => {
    res.locals.admin = req.session.admin
    res.locals.isAuth = req.session.isAuthenticated
    console.log(req.session.isAuthenticated);
    console.log('locals', req.session);
    next()
}