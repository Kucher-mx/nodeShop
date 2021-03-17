const express = require('express')
const hbs = require('express-handlebars')
const Handlebars = require('handlebars')
const mongoose = require("mongoose")
const session = require('express-session')
const MongoDBstore = require('connect-mongodb-session')(session)

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const keys = require('./const/devKeys')

//Routes
const main = require('./routes/main')
const about = require('./routes/about')
const auth = require('./routes/auth')
const contacts = require('./routes/contacts')
const delivery = require('./routes/delivery')
const items = require('./routes/items')
const item = require('./routes/item')
const katalog = require('./routes/katalog')
const profile = require('./routes/profile')

//Middleware
const user = require('./middleware/user')
const vars = require('./middleware/vars')


const app = express()

const store = new MongoDBstore({
    uri: keys.dbKey,
    collection: 'session'
})

app.use(session({
    store: store,
    secret: keys.secret,
    resave: false,
    saveUninitialized: false
}))

app.engine('hbs', hbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    // helpers: require('./helpers/hbs-helper')
}))

app.set('view engine', 'hbs')
app.set('views', 'views')
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
// app.use('/images', express.static('images'))
app.use(express.urlencoded({extended: true}))

app.use(user)
app.use(vars)

app.use('/', main)
app.use('/about', about)
app.use('/auth', auth)
app.use('/contacts', contacts)
app.use('/delivery', delivery)
app.use('/items', items)
app.use('/item', item)
app.use('/category', katalog)
app.use('/profile', profile)

start()

async function start() {
    try{
        await mongoose.connect(keys.dbKey, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        const PORT = 3005
        app.listen(process.env.PORT || PORT, () => {
            console.log("the app is running on the port: ", PORT);
        })
    } catch(e){

    }
}
