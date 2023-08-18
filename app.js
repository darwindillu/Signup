let express= require('express');
let path= require('path');
let app=express();
let cookieParser=require('cookie-parser')
let sessions=require('express-session')

const UserRouter = require("./routes/UserRouter")
const AdminRouter = require("./routes/adminRouter");
const collection=require('./mongodb')

app.set('view engine','ejs');
app.set('views','views');
app.use(sessions({
    secret: ['secret1','secret2','secret3','secret4','secret5',],
    saveUninitialized:true,
    resave: false 
  }));

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    res.header('Cache-Control', 'no-store');
    next()
  })

app.use("/user", UserRouter)
app.use("/admin", AdminRouter)



// for first page (admin login)

app.get("/", (req, res) => {
    if(req.session.user) {
        res.redirect("/admin/home")
    } else {
        res.render("loginadmin")
    }
})



app.get("/admin/login", (req, res) => {
    if(req.session.user1) {
        res.redirect("/admin/home")
    } else {
        res.render("loginadmin")
    }
})



app.get('/login',(req,res)=>{
    if(req.session.user1){
    res.render('userhome')}
    else{res.render('loginuser')}
})


app.get("/home", (req, res) => {
    if(req.session.user1){
    res.render("userhome")
}else{res.render('loginuser')}})



app.get("/signup", (req, res) => {
    if(req.session.user1){
    res.redirect("/user/home")
}else{
    res.render('signup')
}
})


app.get("/adduser", (req, res) => {
    
    res.render("adduser")
})


app.listen(3000,()=>
{console.log('server started')});

