const express = require('express')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const Campground = require('./models/campground')
const wrapAsync = require('./utils/wrapasync')
const ExpressError = require('./utils/expresserror')
const campgroundSchema = require('./schemas')

const router = express.Router()

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else {
        next()
    }
}

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.get('/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    res.render('campgrounds/show', {campground})
})

router.get('/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground})
})

router.post('/',validateCampground, wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`campgrounds/${campground.id}`)
}))

router.put('/:id', validateCampground, wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.update({...req.body.campground })
        res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:id', wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.delete()
        res.redirect('/campgrounds')
}))