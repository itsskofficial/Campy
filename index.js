const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const Campground = require('./models/campground')
const ExpressError = require('./utils/expresserror')
const session = require('express-session')
const flash=require('connect-flash')


const campgrounds = require('./routes/campgrounds')
const reviews=require('./routes/reviews')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(__dirname + '/public'))
app.use('/camgrounds', campgrounds)
app.use('/campgrounds/:id/reviews',reviews)

const sessionConfig = {
    secret: 'ojaswinithegreat',
    resave: false,
    saveUnitialized: true,
    cookie: {
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 660 * 60 * 24 * 7,
        httpOnly:true
    }
}

app.use(session(sessionConfig))
app.use(flash)


mongoose.connect('mongodb://localhost:27017/campy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open",() => {
    console.log("Database connected")
})
   
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/makecampground', async (req, res) => {
    res.send("Making campground here")
    const camp = new Campground({ title: "Camp", description: "Our first camping ground"})
    await camp.save()
    res.send(camp)
})

app.get('/', (req,res) => {
    res.render('index')
})


app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found",404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message ="Something went wrong" } = err
    res.status(statusCode).render('error',{err})
})

app.listen('5500', () => {
    console.log("App listening on port 5500")
})

