const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const Campground = require('./models/campground')
const wrapAsync = require('./utils/wrapasync')
const ExpressError = require('./utils/expresserror')
const campgroundSchema = require('./schemas')
const Review = require('./models/review')
const reviewSchema= require('./schemas')
const campgrounds = require('./routes/campgrounds')
const reviews

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(__dirname + '/public'))
app.use('/camgrounds',campgrounds)


mongoose.connect('mongodb://localhost:27017/campy', {
    useNewUrlParser: true,
    useUnifiedTopology:true
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

