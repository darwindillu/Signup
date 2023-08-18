const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SignUpLogin')
.then(()=>{
    console.log("connected");
})
.catch((error)=>{
    console.log('not connected',error);
});

const LoginSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model('collection',LoginSchema);

module.exports=collection;

