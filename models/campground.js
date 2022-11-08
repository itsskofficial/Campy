const mongoose = require('mongoose')
const Review=require('./review')


const CampgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String
    reviews=[
        {
            type:mongoose.Schema.
        }
        
    ]
})

module.exports = mongoose.model('Campground', CampgroundSchema)