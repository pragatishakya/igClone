const express = require('express')
const User=require('../models/user')
const router= express.Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const requireLogin= require('../middleware/requireLogin')


router.post("/signup", (req,res)=>{
    const {name,email,password,pic}= req.body
    if(!email || !name || !password){
        res.status(422).json({error:"Please add all the fields"})
    }
    else{
        User.findOne({email:email})
            .then((savedUser)=>{
                if(savedUser){
                    res.status(422).json({error:"User already exists"})
                }
                else{
                    bcrypt.hash(password, 12,).then(hashedPassword=>{
                        const user= new User({
                            name,
                            email,
                            password:hashedPassword,
                            pic
                        }) 
                        user.save()             
                            .then(user=>{
                                res.status(200).json({msg:"User added successfully"})
                            })
                    })
                }
            })
    }
})

router.post("/login",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "Please add email and password!"})
    }else{
        User.findOne({email:email}).then(dbUser=>{
            if(!dbUser){
                res.status(422).json({error:"Please login first"})
            }else{
                bcrypt.compare(password, dbUser.password)
                      .then(doMatch=>{
                        if(doMatch){
                            const token= jwt.sign({id:dbUser._id},SECRETKEY)
                            return res.json({token})
                        }else{
                            return res.status(422).json({error:"Invalid password"})
                        }
                    })
                }
        })
    }
})

router.get("/protected",requireLogin,(req,res)=>{
    res.json(req.user)
})

module.exports=router