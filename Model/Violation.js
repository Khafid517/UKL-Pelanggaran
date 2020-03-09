const mongoose = require('mongoose')
const Schema = mongoose.Schema

const violationSchema = new Schema({
    violation_name:{
        type: String,
        required: true
    },
    violation_type:{
        type: String,
        enum: ['kedisiplinan', 'kerapian', 'kerajinan'],
        required: true
    },
    point:{
        type: String,
        required: true
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

module.exports = Violation = mongoose.model('violation', violationSchema)