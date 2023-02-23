const express = require('express')
const User=require('../models/user')
const router= express.Router()
const bcrypt= require('bcrypt')

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

module.exports=router