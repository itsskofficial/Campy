const express = require('express')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const Campground = require('./models/campground')
const wrapAsync = require('./utils/wrapasync')
const ExpressError = require('./utils/expresserror')
const campgroundSchema = require('./schemas')

const router = express.Router()

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next()
    }
}

router.post('/cam/:id/reviews', validateReview,wrapAsync(async (req, res, next) => {
    const campground= await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/campgrounds/:campId/reviews/:reviewId', wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.campId, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${campId}`)
}))

module.exports=router