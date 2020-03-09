const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pointSchema = new Schema({
    student_id:{
        type: Schema.Types.ObjectId,
        ref: "student"
    },
    violation_id:{
        type: Schema.Types.ObjectId,
        ref: "violation"
    },
    date:{
        type: Date,
        default: Date.now
    },
    information:{
        type: String,
        default: "tidak ada kerterangan"
    },
    officer_id:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = Point = mongoose.model('point', pointSchema)