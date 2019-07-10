const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const app=express()
//EJS
app.use(expressLayouts)
app.set('view engine','ejs')

const PORT=process.env.PORT ||5000
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.listen(PORT);