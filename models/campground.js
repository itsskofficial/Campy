const mongoose = require('mongoose')

Schema = new mongoose.Schema()

const CampgroundSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema)