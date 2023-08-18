let express= require('express');
let path=require('path');
const collection = require("../mongodb");
const { default: mongoose } = require('mongoose');
const { markAsUntransferable } = require('worker_threads');
const { log } = require('console');
let AdminRouter= express.Router();

let emaildd='ddillu777@gmail.com';
let passworddd= "1234";

// login verification

AdminRouter.post('/home',(req,res)=>{

  const{email,password}=req.body;
  if((email===emaildd && password===passworddd)){
    req.session.user=email;
    res.redirect('/admin/home')
} else{
    res.render('loginadmin',{isAlert:true})}

});

AdminRouter.get('/home', async (req, res) => {
    try {
      const user = await collection.find({}, 'username email _id');
      if(req.session.user){ 
      res.render('adminhome', { users:user }); 
    } else{
         res.redirect('/')
    }}catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// admin home after add user

AdminRouter.post("/home1", async (req, res) => {
    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.email===req.body.email){
            
         
            res.render('adduser',{err:true})
        }
    }
    catch{
        const data={
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
            
        }
        console.log(data);
await collection.insertMany([data])
  if( req.session.user){
res.redirect('/admin/home')

    }else{res.redirect('/')}
   
}});


AdminRouter.get('/home1', async (req, res) => {
    try {
      const user = await collection.find({}, 'username email _id');
      if(req.session.user){ 
      res.render('adminhome', { users:user }); 
    } else{
         res.redirect('/')
    }}catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// for editing user

AdminRouter.get('/updateuser/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await collection.findById(userId); 
      if (user) {
        if(req.session.user){
        res.render('updateuser', { users:[user]}); 
      } else {
        if(user==null){
        res.redirect('/admin/home1')
      } else{res.redirect('/')}
    }
    }}
  catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// after updating user

AdminRouter.post('/updateuser', async (req, res) => {
        const userId = req.body.userId;
  try {
        const updateData = {
          username: req.body.username,
          email: req.body.email
        };
          await collection.updateOne( {_id:userId} ,{$set: updateData});
        
        res.redirect('/admin/home');
      }
  catch (err) {
        console.log("it running on try");  
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
 });

 //
    
 AdminRouter.get('/deleteuser/:userId', async (req, res) => {
      const userId = req.params.userId;
  try {
         const result=   await collection.deleteOne( {_id:userId});
          if(result.deletedCount==1){
            if(req.session.user){
          res.redirect('/admin/home')}
        else{ res.render('loginadmin')}}
          else{res.status(404).json({ error: 'User not found' });};
        } 
  catch (err) {
          console.log("it running on try");  
          console.error('Error updating user:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
  });

// for searching the user 
   
AdminRouter.post('/search', async (req, res) => {
  try {
          const name=req.body.username
          const user = await collection.find({username:name},{_id:0,username:1,email:1});
          if(user){ 
            console.log(user);
          res.render('search', { users:user }); 
          
        } else{
             res.redirect('/')
        }}
  catch (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
  });

// logout router

AdminRouter.get('/logout', (req,res,next)=>{
    req.session.destroy((err)=> {
        if (err) {
            res.send(err.message)
        } else {
            res.redirect('/')
        }
    })
  });

module.exports= AdminRouter;