const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

const app = express()

mongoose.connect('mongodb://localhost:27017/campy', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open",() => {
    console.log("Database connected")
})
   

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
    const campgrounds = await campgrounds.find({})
    res.render('campgrounds/index', campgrounds)
})

app.listen('5500', () => {
    console.log("App listening on port 5500")
})

