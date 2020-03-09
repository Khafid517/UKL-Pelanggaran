const express = require('express')
const cors = require('cors')
const Router = express.Router()
Router.use(cors())

const Violation = require('../Model/Violation')

Router.post('/violation',(req, res)=>{
    const violationData = {
        violation_name: req.body.violation_name,
        violation_type: req.body.violation_type,
        point: req.body.point
    }
    Violation.findOne({
        violation_name : req.body.violation_name
    })
        .then(violation=>{
            if(!violation){
                Violation.create(violationData)
                    .then(violation=>{
                        res.json({ status: violation.violation_name + " registered!"})
                    })
                    .catch(err=>{
                        res.send("error " + err)
                    })
            }else{
                res.json({ error: "Violation alredy exsist"})
            }
        })
        .catch(err=>{
            res.send("error " + err)
    })
})

Router.put('/violation/:id',(req, res)=>{
        var today = new Date()
    Violation.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            violation_name: req.body.violation_name,
            violation_type: req.body.violation_type,
            point: req.body.point,
            updated_at: today
        }
    })
        .then(resp=> res.send({status: resp.violation_name +" alredy updated"}))
        .catch(err=>res.send("error" + err))
})

Router.delete("/violation/:id", (req, res)=>{
    Violation.findById(req.params.id)
        .then(violation=> violation.remove().then(()=> res.json({sucess: true})))
        .catch(err=> res.status(404).json({sucess: false}))
})

Router.get("/violation/:id", (req, res)=>{
    Violation.findById(req.params.id).then(violation=> res.json(violation))
})

Router.get("/violation", (req, res)=>{
    Violation.find().then(violations=> res.json(violations))
})

module.exports = Router
