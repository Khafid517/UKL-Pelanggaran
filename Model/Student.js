const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    nis:{
        type: String,
        required: true
    },
    student_name:{
        type: String,
        required: true
    },
    class:{
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

module.exports = Student = mongoose.model('student', studentSchema)