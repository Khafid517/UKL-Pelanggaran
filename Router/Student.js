const express = require('express')
const cors = require('cors')
const Router = express.Router()
Router.use(cors())

const Student = require('../Model/Student')

Router.post('/student',(req, res)=>{
    const studentData = {
        nis: req.body.nis,
        student_name: req.body.student_name,
        class: req.body.class,
    }
    Student.findOne({
        nis : req.body.nis
    })
        .then(student=>{
            if(!student){
                Student.create(studentData)
                    .then(student=>{
                        res.json({ status: student.student_name + " registered!"})
                    })
                    .catch(err=>{
                        res.send("error " + err)
                    })
            }else{
                res.json({ error: "Student alredy exsist"})
            }
        })
        .catch(err=>{
            res.send("error " + err)
    })
})

Router.put('/student/:id',(req, res)=>{
        var today = new Date()
    Student.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            nis: req.body.nis,
            student_name: req.body.student_name,
            class: req.body.class,
            updated_at: today
        }
    })
        .then(resp=> res.send({status: resp.student_name +" alredy updated"}))
        .catch(err=>res.send("error" + err))
})

Router.delete("/student/:id", (req, res)=>{
    Student.findById(req.params.id)
        .then(student=> student.remove().then(()=> res.json({sucess: true})))
        .catch(err=> res.status(404).json({sucess: false}))
})

Router.get("/student/:id", (req, res)=>{
    Student.findById(req.params.id).then(student=> res.json(student))
})

Router.get("/student", (req, res)=>{
    Student.find().then(students=> res.json(students))
})

module.exports = Router
