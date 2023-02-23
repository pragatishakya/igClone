const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/flat-user-icon-on-website-600w-1210365988.jpg"
    },
    followers:[{
        type:ObjectId,
        ref:'User'
    }],
    following:[{
        type:ObjectId,
        ref:'User'
    }]
})

module.exports= mongoose.model('User',userSchema)