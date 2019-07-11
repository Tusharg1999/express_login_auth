const router=require('express').Router()
const User=require('../member')
const bcrypt=require('bcryptjs')

router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body
     let errors=[];
     //check for fields
     if(!name || !email || !password || !password2){
         errors.push({msg:'please fill complete form'})
     }     
     if(password!==password2)
     {
         errors.push({msg:'password do not matched'})
     }
     if(password.length<6)
     {
         errors.push({msg:'password should be of 6 characters'})
     }
     if(errors.length>0)
     {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
     }
     else{
         //validation done
         User.findOne({email:email})
         .then(user=>{
             if(user)
             {
                 errors.push({msg:'user already exists'})
                 res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
             }
             else
             {
                const user= new User({
                    name,
                    email,
                    password
                });
                //password encryption with bcrypt
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(user.password,salt,(err,hash)=>{
                        if(err) throw err;
                        //save user
                        user.password=hash;
                        user.save()
                        .then(
                            res.redirect('/users/login')
                        )
                        .catch(err=>console.log(err))
                    })
                })
             }
         })
     }
})
module.exports=router