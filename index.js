const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const Campground = require('./models/campground')
const wrapAsync = require('./utils/wrapasync')
const ExpressError=require('./utils/expresserror')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(__dirname + '/public'))


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
app.set('views', path.join(__dirname , 'views'))

app.get('/makecampground', async (req, res) => {
    res.send("Making campground here")
    const camp = new Campground({ title: "Camp", description: "Our first camping ground"})
    await camp.save()
    res.send(camp)
})

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground})
})

app.post('/campgrounds', wrapAsync(async (req, res, next) => {
    if (!req.body.campground) {
            throw new ExpressError('Invalid campground data',400)
        }
        const campground = new Campground(req.body.campground)
        await campground.save()
        res.redirect(`campgrounds/${campground.id}`)
}))

app.put('/campgrounds/:id', wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.update({...req.body.campground })
        res.redirect(`/campgrounds/${campground.id}`)
}))

app.delete('/campgrounds/:id', wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.delete()
        res.redirect('/campgrounds')
}))

app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found",404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message ="Something went wrong" } = err
    res.status(statusCode).render('error')
})

app.listen('5500', () => {
    console.log("App listening on port 5500")
})

