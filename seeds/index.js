const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {descriptors,places}=require('./seedhelpers')

mongoose.connect('mongodb://localhost:27017/campy', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open",() => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]
console.log(sample(descriptors))

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++)
    {
        const randnum=Math.floor(Math.random() * 1000)
        const camp = new Campground({
            location: `${cities[randnum].city}, ${cities[randnum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB()