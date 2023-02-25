const jwt= require('jsonwebtoken')
const { SECRETKEY } = require('../keys')
const User = require('../models/user')

module.exports= (req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization){
        // return res.status(401).json("You Must be Login")
        return res.status(401).json("Token missing")
    }
    else{
        const token= authorization.replace("Bearer ","")
        jwt.verify(token,SECRETKEY,(err,payload)=>{
            if(err){
                // return res.satus(401).json({error:"You must be loged in"})
                return res.status(401).json("Invalid token")
            }
            else{
                const {id}= payload 
                // console.log(id)
                User.findById(id)
                    .then((userData =>{
                        userData.password= undefined
                        req.user= userData
                        // console.log(userData)
                        next()
                    }))
            }
        })
    }
}