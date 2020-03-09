const express = require('express')
const cors = require('cors')
const Router = express.Router()
Router.use(cors())

const Point = require('../Model/Point')
const Student = require('../Model/Student')

Router.post('/point',(req, res)=>{
    const pointData = {
        information: req.body.information,
        violation_id: req.body.violation_id,
        officer_id: req.body.officer_id,
        student_id: req.body.student_id
    }
    Point.create(pointData)
        .then(point=>{
            res.json({ status: "OKEH!"})
        })
        .catch(err=>{ 
            res.send("error " + err)
        })
        .catch(err=>{
            res.send("error " + err)
    })
})

Router.put('/point/:id',(req, res)=>{
        var today = new Date()
    Point.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            information: req.body.information,
            violation_id: req.body.violation_id,
            officer_id: req.body.officer_id,
            student_id: req.body.student_id,
            updated_at: today
        }
    })
        .then(resp=> res.send({status: " alredy updated"}))
        .catch(err=>res.send("error" + err))
})

Router.delete("/point/:id", (req, res)=>{
    Point.findById(req.params.id)
        .then(point=> point.remove().then(()=> res.json({sucess: true})))
        .catch(err=> res.status(404).json({sucess: false}))
})

Router.get("/point/:id", (req, res)=>{
    Point.findById(req.params.id)
    .populate('point_id')
    .populate('student_id')
    .populate('officer_id')
    .then(points=> res.json(points))
})

Router.get("/point", (req, res)=>{
    Point.find().then(points=> res.json(points))
})

Router.get("/point/student/:id", (req, res)=>{
    Student.findOne({_id:req.params.id})
    .then((student)=> {
        Point.find({student_id:req.params.id})
        .then(violatoin=> res.send({student,violatoin}))
    })
})

Router.get("/dashboard", (req, res)=>{
    
})

module.exports = Router
