const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    res.render('campgrounds/show', {campground})
})

router.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground})
})

router.post('/campgrounds',validateCampground, wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`campgrounds/${campground.id}`)
}))

router.put('/campgrounds/:id', validateCampground, wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.update({...req.body.campground })
        res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/campgrounds/:id', wrapAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        await campground.delete()
        res.redirect('/campgrounds')
}))