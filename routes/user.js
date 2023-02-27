const express= require('express')
const requireLogin = require('../middleware/requireLogin')
const User = require('../models/user')
const Post = require('../models/post')

const router= express.Router()

router.get("/user/:id", requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
        .select("-password")
        .then(user=>{
            Post.findOne({postedBy:req.params.id})
                .populate("postedBy","_id name")
                .exec((err,posts)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }else{
                        return res.status(200).json({user,posts})
                    }
                })
        })
})

router.put("/follow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({errr:err})
        }else{
            User.findByIdAndUpdate(req.user._id,{
                $push:{following: req.body.followId}
            },{
                new:true
            })
            .select("-password")
            .then(result=> res.json(result))
        }
    })
})

router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({errr:err})
        }else{
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following: req.body.followId}
            },{
                new:true
            })
            .select("-password")
            .then(result=> res.json(result))
        }
    })
})


module.exports= router