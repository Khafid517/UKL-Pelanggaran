const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const mongoose = require('mongoose')
const mongoURL = "mongodb://localhost:27017/attituade"

const RouterU = require('./Router/User')
const RouterS = require('./Router/Student')
const RouterP = require('./Router/Point')
const RouterV = require('./Router/Violation')

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise

mongoose
    .connect(mongoURL, {useNewUrlParser: true})
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.log(err))
    
app.use('/api', RouterU)
app.use('/api', RouterS)
app.use('/api', RouterV)
app.use('/api', RouterP)

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});