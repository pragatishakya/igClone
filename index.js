const express= require('express')
const {default: mongoose}= require('mongoose')
const { MONGOURI } = require('./keys')
const app= express()
const cors= require('cors')


mongoose.connect(MONGOURI,(err)=>{
    if(err) console.log(err)
    else console.log("Database Connected !")
})

app.use(express.json())
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

const PORT= 4000
app.listen(PORT,()=>console.log(`server is running at port ${PORT}`))