const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
const app=express()
const PORT=process.env.PORT || 5000
//db config
const db=require('./config/keys').mongoURI;
//connect mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(console.log("database connected"))
.catch(err=> console.log(err))
//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
//bodyParser
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.listen(PORT);