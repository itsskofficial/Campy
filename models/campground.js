const mongoose = require('mongoose')

schema = new mongoose.Schema()

const CampgroundSchema = new schema({
    name: String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema)