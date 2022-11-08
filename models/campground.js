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
            type:
        }
        
    ]
})

module.exports = mongoose.model('Campground', CampgroundSchema)