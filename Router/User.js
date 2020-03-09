const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const Router = express.Router()
Router.use(cors())

const User = require('../Model/User')

process.env.SECET_KEY = "secret"

Router.post('/user',(req, res)=>{
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    User.findOne({
        email : req.body.email
    })
        .then(user=>{
            if(!user){
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    userData.password = hash
                    User.create(userData)
                        .then(user=>{
                            res.json({ status: user.email + " registered!"})
                        })
                        .catch(err=>{
                            res.send("error " + err)
                        })
                })
            }else{
                res.json({ error: "User alredy exsist"})
            }
        })
        .catch(err=>{
            res.send("error " + err)
    })
})

Router.post("/user/login", (req, res)=>{
    User.findOne({
        email: req.body.email
    })
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payLoad = {
                        _id: user._id,
                        email: user.email
                    } 
                    let token = jwt.sign(payLoad, process.env.SECET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }else{
                    res.json({ error: "User doesn't exist"})
                }
            }else{
                res.json({ error: "User doesn't exist"})
            }
        })
        .catch(err=>{
            res.send("error " + err)
        })
})

Router.get('/user/check', (req, res)=>{
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user=>{
            if(user){
                res.json(user)
            }else{
                res.send("user doesn't exist")
            }
        })
        .catch(err=>{
            res.send("error " +  err)
        })
})

Router.put('/user/:id',(req, res)=>{

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        var today = new Date()
        var pass = hash
    User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name: req.body.name,
            email: req.body.email,
            password: pass,
            role: req.body.role,
            updated_at: today
        }
    })
        .then(resp=> res.send({status: resp.role+" alredy updated"}))
        .catch(err=>res.send("error" + err))
    })
})

Router.delete("/user/:id", (req, res)=>{
    User.findById(req.params.id)
        .then(user=> user.remove().then(()=> res.json({sucess: true})))
        .catch(err=> res.status(404).json({sucess: false}))
})

Router.get("/user/:id", (req, res)=>{
    User.findById(req.params.id).then(users=> res.json(users))
})

Router.get("/user/", (req, res)=>{
    User.find().then(users=> res.json(users))
})

module.exports = Router
