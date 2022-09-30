const express = require('express')
const path = require('path')
const mongoose=require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/campy', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
})
    .then(() => {
    console.log("Database connected")
    })
    .catch(() => {
        console.log("Database not connected")
    })

   

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'views'))

app.get('/', (req,res) => {
    res.render('index')
})
app.listen('5500', () => {
    console.log("App listening on port 5500")
})

