const express = require("express")
const collection = require("../mongodb")
const UserRouter = express.Router()

// login page router

UserRouter.get('/login',(req,res)=>{
    if(req.session.user1){
    res.render('userhome')}
    else{res.render('loginuser')}
})

// register validation

UserRouter.post("/register", async (req, res) => {
  try{
        const check=await collection.findOne({email:req.body.email})
        if(check.email===req.body.email){
         
            res.render('signup',{err:true})
        }
    }
  catch{
        const data={
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
            
        }
        await collection.insertMany([data])
            res.redirect('/login')
    }   
});

// router for user home page

UserRouter.get("/home", (req, res) => {
    if(req.session.user1){
    res.render("userhome")
      }
    else{res.render('loginuser')}
})

// home page after registration

UserRouter.post("/home", async(req, res) => {
  try{
        const check=await collection.findOne({email:req.body.email})
        if(check.password===req.body.password){
            req.session.user1=req.body.email
            res.redirect('/user/home')
        }
        else{res.render('loginuser', {err:true})}
    }
  catch{
    res.render('loginuser',{err:true}) }
});

// logout user

UserRouter.get("/logout", (req, res) => {
    req.session.destroy((err)=>{
        if(err){
            res.send(err.message)
        }else(res.redirect('/login'))})
})


module.exports = UserRouter